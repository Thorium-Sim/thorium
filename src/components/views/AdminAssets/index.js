import React, {Component} from 'react';
import { Button, Row, Col, Card } from '../../generic';
import 'whatwg-fetch';
import FontAwesome from 'react-fontawesome';
import './style.scss';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

/*class UploadProfilePicture extends Component {

	onSubmit = ({target}) => {
		const { uploadAsset } = this.props
    uploadAsset(123, target.files)
    .then(({ data }) => {
    	console.log('data', data);
    })
    .catch(error => {
    	console.log('error', error.message);
    })
  }

  render() {
  	return (
  		<input type="file" onChange={this.onSubmit.bind(this)} />
  		)
  }

}

const UPLOAD_ASSET = gql`
mutation UploadAsset($id: Int!, $files: [UploadedFile!]!) {
	uploadAsset(id: $id, files: $files) 
}`

const withFileUpload = graphql(UPLOAD_ASSET, {
	props: ({ ownProps, mutate }) => ({
		uploadAsset: (id, files) => mutate({
			variables: { id, files },
		}),
	}),
})

export default withFileUpload(UploadProfilePicture)
*/
const ASSET_FOLDER_SUB = gql`
subscription AssetFolderSubscription{
	assetFolderChange {
		id
		folderPath
		fullPath
		name
		containers {
			id
			name
			fullPath
			folderPath
			objects {
				id
				containerId
				containerPath
				simulatorId
				url
			}
		}
	}
}
`

class AdminAssetsView extends Component {
	constructor(props){
		super(props);
		this.assetFolderSubscription = null;
		this.state = {
			currentDirectory:'/',
			currentContainer:{},
		};
	}
	componentWillReceiveProps(nextProps) {
		if (!this.assetFolderSubscription && !nextProps.data.loading) {
			this.assetFolderSubscription = nextProps.data.subscribeToMore({
				document: ASSET_FOLDER_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.assetFolders = subscriptionData.data.assetFolderChange;
					return previousResult;
				},
			});
		}
	}
	_setDirectory(directory){
		this.setState({currentDirectory:directory});
	}
	_setContainer(container){
		this.setState({currentContainer:container});
	}
	_createFolder(){
		let name = prompt('What is the name of the folder?');
		const currentDirectory = this.state.currentDirectory === '/' ? '' : this.state.currentDirectory
		let obj = {
			name: name,
			folderPath: this.state.currentDirectory,
			fullPath: `${currentDirectory}/${name}`,
		};
		this.props.addAssetFolder(obj);
	}
	_createContainer(){
		let name = prompt('What is the name of the container?');//Get the current directory's folder
		let directory = this.props.data.assetFolders.filter((folder) => {
			return folder.fullPath === this.state.currentDirectory;
		})[0];
		let obj = {
			name: name,
			folderId: directory.id,
			folderPath: this.state.currentDirectory,
			fullPath: this.state.currentDirectory + '/' + name,
		};
		this.props.addAssetContainer(obj);
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
		/*this.props.cardData.assets.containers.filter((container) => {
			return container.folderId === directory.id;
		}).forEach((container) => {
			this._deletecontainer(container);
		});*/
		//Now delete the folder
		this.props.removeAssetFolder({id: directory.id});
	}
	_deleteContainer(container){
		//First delete all of the objects attached to this container
		/*this.props.cardData.assets.objects.filter((object) => {
			return object.containerId === container.id;
		}).forEach((object) => {
			//this.props.operationChannel.push("delete",{table:"assetobjects",filter:{id:object.id}});
		});*/
		//Now delete the container
		this.props.removeAssetContainer({id:container.id});
	}
	_deleteObject(object){
		//Just delete the object
		//this.props.operationChannel.push("delete",{table:"assetobjects",filter:{id:object.id}});
	}
	_massUpload(e){
		//let files = e.target.files;
	}
	render(){
		console.log(this.props.data);
		return (
			this.props.data.loading ? <span>Loading...</span> :
			<div className="cardAdminAssets">
			<Row>
			<Col className="col-sm-4">
			<div className="btn-group">
			<Button type="primary" onClick={this._createFolder.bind(this)} label={<FontAwesome name="folder-open" />} />
			<Button type="primary" onClick={this._createContainer.bind(this)} label={<FontAwesome name="file" />} />
			<Button type="warning" label={<FontAwesome name="upload" />} />
			</div>
			<div style={{opacity: 0,width: '0px'}}>
			<input ref="massUpload" type="file" id="mass-upload-folder" multiple onChange={this._massUpload.bind()} />
			</div>
			<p><strong>Path: {this.state.currentDirectory}</strong></p>
			<Card className="flintassetbrowser">
			<ul>
			{this.state.currentDirectory !== '/' ?
			<li className="folder">
			<FontAwesome name="folder" />
			<a href="#" onClick={
				(() => {
						//Get the current directory's folder
						let directory = this.props.data.assetFolders.filter((folder) => {
							return folder.fullPath === this.state.currentDirectory;
						})[0];
						this.setState({
							currentDirectory: directory.folderPath
						});
					})
			} className="cd-dot-dot"><span className="glyphicon-class">&laquo; Back</span></a>
			</li> : <div />
		}
		{this.props.data.assetFolders.filter((folder) => {
			return folder.folderPath === this.state.currentDirectory;
		}).map((folder) => {
			return (<li key={folder.id}>
				<FontAwesome name="folder" /> 
				<a href="#" onClick={this._setDirectory.bind(this,folder.fullPath)} className="folder"><span className="glyphicon-class">{folder.name}</span></a> 
				<FontAwesome name="ban" className="text-danger" onClick={this._deleteFolder.bind(this,folder)} />
				</li>);
		})}
		{
			this.props.data.assetFolders
			.find(folder => {console.log(folder, this.state.currentDirectory); return folder.fullPath === this.state.currentDirectory})
			.containers.map((container) => {
				return (<li key={container.id}>
					<FontAwesome name="file" />
					<a href="#" onClick={this._setContainer.bind(this,container)} className="containerLink"><span className="glyphicon-class">{container.name}</span></a>
					<FontAwesome name="ban" className="text-danger" onClick={this._deleteContainer.bind(this,container)} />
					</li>);
			})
		}
		{/*this.props.cardData.containers.filter((container) => {
			return container.folderPath === this.state.currentDirectory;
		}).map((container) => {
			return (<li key={container.id}>
				<FontAwesome name="file" />
				<a href="#" onClick={this._setContainer.bind(this,container)} className="containerLink"><span className="glyphicon-class">{container.name}</span></a>
				<FontAwesome name="ban" className="text-danger" onClick={this._deleteContainer.bind(this,container)} />
				</li>);
			})*/}
			</ul>
			</Card>
			</Col>
			{this.state.currentContainer.id ?
				<Col className="col-sm-8">
				<h2>Asset: {this.state.currentContainer.name}</h2>
				<h3 className="selectable">Asset Path: {this.state.currentContainer.fullPath}</h3>
				<h3>Objects:</h3>
				<ul>
			{/*this.props.cardData.objects.filter((object) => {
				return object.containerId === this.state.currentContainer.id;
			}).map((object) => {
				return (<li key={object.id}>
					{object.simulatorId}
					<img role="presentation" src={object.url} className="img-responsive"/>
					<FontAwesome name="ban" className="text-ban" onClick={this._deleteObject.bind(this,object)} />
					</li>);
				})*/}
				</ul>
				<select ref="simulatorSelect" className="c-select">
				<option value="default">Default</option>;
			{/*this.props.data.simulatorsData.map((simulator) => {
				return <option key={simulator.id} value={simulator.id}>{simulator.name}</option>;
			})*/}
			</select>
			<input type="file" onChange={this._createObject.bind(this)} />
			</Col>
			: <div></div> }
			</Row>
			</div>
			);
	}
}

const ASSET_FOLDER_QUERY = gql`
query GetAssetFolders{
	assetFolders{
		name
		fullPath
		id
		folderPath
		containers {
			id
			fullPath
			folderPath
			name
			objects {
				id
				containerId
				containerPath
				simulatorId
				fullPath
				url
			}
		}
	}
}
`;

const ADD_ASSET_FOLDER = gql`
mutation AddAssetFolder($name: String!, $fullPath: String!, $folderPath: String!){
	addAssetFolder(name: $name, fullPath: $fullPath, folderPath: $folderPath)
}`;

const REMOVE_ASSET_FOLDER = gql`
mutation RemoveAssetFolder($id: ID!){
	removeAssetFolder(id:$id)
}`;

const ADD_ASSET_CONTAINER = gql`
mutation AddAssetContainer($name: String!, $folderId: ID, $fullPath: String, $folderPath: String){
	addAssetContainer(name: $name, folderId: $folderId, fullPath: $fullPath, folderPath: $folderPath)
}`;

const REMOVE_ASSET_CONTAINER = gql`
mutation RemoveAssetContainer($id: ID!){
	removeAssetContainer(id:$id)
}`;

export default compose(
	graphql(ASSET_FOLDER_QUERY),
	graphql(ADD_ASSET_FOLDER, {name: 'addAssetFolder',
		props: ({addAssetFolder}) => ({
			addAssetFolder: (props) => addAssetFolder({
				variables: Object.assign(props)
			})
		})
	}),
	graphql(REMOVE_ASSET_FOLDER, {name: 'removeAssetFolder',
		props: ({removeAssetFolder}) => ({
			removeAssetFolder: (props) => removeAssetFolder({
				variables: Object.assign(props)
			})
		})
	}),
	graphql(ADD_ASSET_CONTAINER, {name: 'addAssetContainer',
		props: ({addAssetContainer}) => ({
			addAssetContainer: (props) => addAssetContainer({
				variables: Object.assign(props)
			})
		})
	}),
	graphql(REMOVE_ASSET_CONTAINER, {name: 'removeAssetContainer',
		props: ({removeAssetContainer}) => ({
			removeAssetContainer: (props) => removeAssetContainer({
				variables: Object.assign(props)
			})
		})
	}),
	)(AdminAssetsView);


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