import React, {Component} from 'react';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import FontAwesome from 'react-fontawesome';
import './style.scss';

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
			<input type="file" id="mass-upload-folder" multiple />
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
				</li>);
		})}
		{this.state.containers.filter((container) => {
			return container.folderPath === this.state.currentDirectory;
		}).map((container) => {
			return (<li class="">
				<FontAwesome name="file" />
				<a href="#" onClick={this._setContainer.bind(this,container)} className="containerLink"><span className="glyphicon-class">{container.name}</span></a>
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
		<li>{this.props.params.simulatorId} <img src="{url}" class="img-responsive"/></li>
		</ul>
		<input type="file" />
		<Button type="primary" label="Add Object" />
		<Button type="primary" label="Set Default" />
		<Button type="warning" label="Delete Object" />
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