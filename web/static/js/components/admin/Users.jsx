import React, { Component } from 'react';
import { Col, Row, Container, Table } from 'reactstrap';
import { Link, withRouter } from 'react-router';
import gql from 'graphql-tag';
import { connect } from 'react-apollo';
import FontAwesome from 'react-fontawesome';

class UserAdminView extends Component {
	_removeRole(userId, roleName){
		let self = this;
		this.props.mutations.revokeRole({
			userId: userId,
			name: roleName,
		}).then(() => {
			self.props.data.refetch();
		});
	}
	_addRole(index, userId,event){
		let self = this;
		if (event.which === 13){
			let roleName = event.target.value;
			event.target.value = '';
			this.props.mutations.addRole({
				userId: userId,
				name: roleName,
			}).then(() => {
				self.props.data.refetch();
			});

		}
	}
	render(){
		return (
			<Container>
			<Row>
			<h2>User Admin</h2>
			<Col sm={12}>
			{(() => {
				if (this.props.data.loading){
					return <h2>Loading...</h2>;
				} else {
					return (<Table striped hover size="sm">
						<thead>
						<tr>
						<th>Email</th>
						<th>Roles</th>
						<th>Add Role</th>
						</tr>
						</thead>
						<tbody>
						{this.props.data.users.map((user, index) => {
							return <tr key={`user-${index}`}>
							<td>{user.email}</td>
							<td>{user.roles.map((role) => {
								return <span className="tag tag-primary">{role.name} <FontAwesome name="ban" className="text-danger" onClick={this._removeRole.bind(this,user.id,role.name)} /></span>;
							})}</td>
							<td><input type="text" onKeyDown={this._addRole.bind(this,index,user.id)} className="form-control" /></td>
							</tr>;
						})}
						</tbody>
						</Table>);
				}
			})()}
			</Col>
			</Row>
			</Container>
			);
	}
}

export default withRouter(connect({
	mapMutationsToProps: () => {
		return {
			addRole: (args) => ({
				mutation: gql`
				mutation addRole($userId: String! $name: String!) {
					add_role(userId: $userId, name: $name) {
						userId,
						name
					}
				}
				`,
				variables: {
					userId: args.userId,
					name: args.name
				},
				updateQueries: {
					users: (previousQueryResult, { mutationResult }) => {
						const userId = mutationResult.data.add_role.userId;
						const roleName = mutationResult.data.add_role.name;

						return previousQueryResult.map((res) => {
							if (res.id === userId){
								res.roles.push({name: roleName});
							}
							return res;
						});
					},
				}
			}),
			revokeRole: (args) => ({
				mutation: gql`
				mutation revokeRole($userId: String! $name:String!) {
					revoke_role(userId: $userId, name: $name) {
						userId,
						name
					}
				}
				`,
				variables: {
					userId: args.userId,
					name: args.name
				},

			})
		};
	},
	mapQueriesToProps: () => {
		return {
			data: {
				query: gql`
				query users {
					users {
						id,
						email,
						roles{
							name
						}
					}
				}`
			},
		};
	}
})(UserAdminView));
