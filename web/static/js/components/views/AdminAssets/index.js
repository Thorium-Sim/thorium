import React, {Component} from 'react';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import { connect } from 'react-redux';
import actions from '../../../actions';

import FontAwesome from 'react-fontawesome';
import './style.scss';

const {assets} = actions;
const {fetchFolders, fetchContainers, fetchObjects} = assets;

class AdminAssets extends Component {
	constructor(props){
		super(props);
		this.state = {
			folders:[{
				"_id" : "ThGfCBkTTTJozqJkp",
				"name" : "Videos",
				"fullPath" : "/Videos",
				"folderPath" : "/"
			}],
			containers:[
			{
				"_id" : "xnp6HTSfySxBizGfz",
				"name" : "Bridge Ambiance",
				"folderId" : "G7SwrbxcWsuKnFj9j",
				"fullPath" : "/Sounds/Ambiance/Bridge Ambiance",
				"folderPath" : "/Videos"
			}
			],
			currentDirectory:'/',
			currentContainer:{},
		};
	}
	_setDirectory(directory){
		this.setState({currentDirectory:directory});
	}
	_setContainer(container){
		this.setState({currentContainer:container});
	}
	_createFolder(){
		let name = promps('What is the name of the folder?');
		let obj = {
			name: name,
			folderPath: this.state.currentDirectory,
			fullPath: this.state.currentDirectory + name,
		};
		this.props.operationChannel.push("insert",{table:"assetfolders",data:obj});
	}
	_createContainer(){
		let name = promps('What is the name of the container?');//Get the current directory's folder
		let directory = this.state.folders.filter((folder) => {
			return folder.fullPath === this.state.currentDirectory;
		})[0];
		let obj = {
			name: name,
			folderId: directory.id,
			folderPath: this.state.currentDirectory,
			fullPath: this.state.currentDirectory + name,
		};
		this.props.operationChannel.push("insert",{table:"assetcontainers",data:obj});
	}
	_createObject(e){
		//Upload to the currently selected simulator.
		let file = e.target.files[0];
		let formData = new FormData();
		let simulatorId = this.refs.simulatorSelect.value || 'default';
		formData.append('asset',file);
		formData.append('folderPath',this.state.currentDirectory);
		formData.append('containerId',this.state.currentContainer.id);
		formData.append('containerPath',this.state.currentContainer.fullPath);
		formData.append('fullPath',this.state.currentContainer.fullPath + '/' + simulatorId);
		formData.append('simulatorId', simulatorId);
		fetch('/assets',{
			method:'POST',
			body:formData
		});
	}
	_deleteFolder(directory){
		//First delete all of the objects attached to containers attached to this folder
		this.props.data.assets.containers.filter((container) => {
			return container.folderId === directory.id;
		}).forEach((container) => {
			this._deletecontainer(container);
		});
		//Now delete the folder
		this.props.operationChannel.push("delete",{table:"assetfolders",filter:{id:directory.id}});
	}
	_deleteContainer(container){
		//First delete all of the objects attached to this container
		this.props.data.assets.objects.filter((object) => {
			return object.containerId === container.id;
		}).forEach((object) => {
			this.props.operationChannel.push("delete",{table:"assetobjects",filter:{id:object.id}});
		});
		//Now delete the container
		this.props.operationChannel.push("delete",{table:"assetcontainers",filter:{id:container.id}});
	}
	_deleteObject(object){
		//Just delete the object
		this.props.operationChannel.push("delete",{table:"assetobjects",filter:{id:object.id}});
	}
	_massUpload(e){
		let files = e.target.files;
	}
	render(){
		return (
			<div className="cardAdminAssets">
			<Row>
			<Col className="col-sm-4">
			<div className="btn-group">
			<Button type="primary" label={<FontAwesome name="folder-open" />} />
			<Button type="primary" label={<FontAwesome name="file" />} />
			<Button type="warning" label={<FontAwesome name="upload" />} />
			</div>
			<div style={{opacity: 0,width: '0px'}}>
			<input type="file" id="mass-upload-folder" multiple onChange="_massUpload" />
			</div>
			<p><strong>Path: {this.state.currentDirectory}</strong></p>
			<Card className="flintassetbrowser">
			<ul>
			{this.state.currentDirectory !== '/' ?
			<li class="folder">
			<FontAwesome name="folder" />
			<a href="#" onClick={
				(() => {
						//Get the current directory's folder
						let directory = this.state.folders.filter((folder) => {
							return folder.fullPath === this.state.currentDirectory;
						})[0];
						this.setState({
							currentDirectory: directory.folderPath
						});
					})
			} className="cd-dot-dot"><span className="glyphicon-class">&laquo; Back</span></a>
			</li> : <div />
		}
		{this.state.folders.filter((folder) => {
			return folder.folderPath === this.state.currentDirectory;
		}).map((folder) => {
			return (<li>
				<FontAwesome name="folder" />
				<a href="#" onClick={this._setDirectory.bind(this,folder.fullPath)} className="folder"><span className="glyphicon-class">{folder.name}</span></a>
				<FontAwesome name="folder" className="text-warning" onClick={this._deleteFolder.bind(this,folder)} />
				</li>);
		})}
		{this.state.containers.filter((container) => {
			return container.folderPath === this.state.currentDirectory;
		}).map((container) => {
			return (<li class="">
				<FontAwesome name="file" />
				<a href="#" onClick={this._setContainer.bind(this,container)} className="containerLink"><span className="glyphicon-class">{container.name}</span></a>
				<FontAwesome name="folder" className="text-warning" onClick={this._deleteContainer.bind(this,container)} />
				</li>);
		})}
		</ul>
		</Card>
		</Col>
		<Col className="col-sm-8">
		<h2>Asset: {this.state.currentContainer.name}</h2>
		<h3 className="selectable">Asset Path: {this.state.currentContainer.fullPath}</h3>
		<h3>Objects:</h3>
		<ul>
		{this.state.objects.filter((object) => {
			return object.containerId === this.state.currentContainer.id;
		}).map((object) => {
			return (<li>
				{object.simulatorId}
				<img src={object.url} class="img-responsive"/>
				<FontAwesome name="folder" className="text-warning" onClick={this._deleteObject.bind(this,object)} />
				</li>);
		})}
		</ul>
		<select ref="simulatorSelect" className="c-select">
		{this.props.data.simulators.map((simulator) => {
			return <option value={simulator.id}>{simulator.name}</option>;
		})}
		</select>
		<input type="file" onChange="_addObject" />
		<Button type="primary" label="Add Object" />
		<Button type="primary" label="Set Default" />
		</Col>
		</Row>
		</div>
		);
	}
}
export default AdminAssets;


/*

{
	"_id" : "ThGfCBkTTTJozqJkp",
	"name" : "Videos",
	"fullPath" : "/Videos",
	"folderPath" : "/"
}

{
	"_id" : "xnp6HTSfySxBizGfz",
	"name" : "Bridge Ambiance",
	"folderId" : "G7SwrbxcWsuKnFj9j",
	"fullPath" : "/Sounds/Ambiance/Bridge Ambiance",
	"folderPath" : "/Sounds/Ambiance"
}

{
	"_id" : "82iDaTAwkaNRv3ZEL",
	"containerId" : "rrhWLcdkwgf2YpXTx",
	"objectId" : "wBfzP5bsuDEEYhg2r",
	"folderPath" : "/Sounds",
	"containerPath" : "/Sounds/chime2",
	"objectPath" : "/Sounds/chime2"
}

*/