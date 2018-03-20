import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ResourcesItem from './ResourcesItem';

import { setResource } from '../../actions/resource';

import './resources.scss';

const mapDispatchToProps = dispatch => bindActionCreators({
  setResource
}, dispatch);

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resources: props.formData
    };

    this.handleAddResource = this.handleAddResource.bind(this);
    this.handleEditResource = this.handleEditResource.bind(this);
    this.getResourceTypeSchema = this.getResourceTypeSchema.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      resources: props.formData
    });
  }

  getResourceTypeSchema() {
    return this.props.schema.items.properties['ams:resourceType'];
  }

  handleAddResource(type) {
    this.props.setResource({
      'ams:resourceType': type
    });
  }

  handleEditResource(resource) {
    this.props.setResource(resource);
  }

  render() {
    const { resources } = this.state;

    return (
      <div className="resources">
        {this.props.schema.items.properties['ams:resourceType'].enumNames.map((type, index) => (
          <div className="resources-type" key={this.getResourceTypeSchema().enum[index]}>
            <div className="resources-type__header">
              <span className="resources-type__header-title">{type}</span>
              <button
                type="button"
                onClick={() => this.handleAddResource(this.getResourceTypeSchema().enum[index])}
                className="resources-button resources-button-new"
              />
            </div>
            <div className="resources-type__content">
              {resources.filter(resource => resource['ams:resourceType'] === this.getResourceTypeSchema().enum[index]).map(resource => (
                <div
                  className="resources-type__content-item"
                  key={resource.id}
                >
                  <ResourcesItem
                    resource={resource}
                    schemaProps={this.props.schema.items.properties}
                  />
                  <button
                    type="button"
                    onClick={() => this.handleEditResource(resource)}
                    className="resources-button resources-button-edit"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Resources.defaultProps = {
  formData: []
};

Resources.propTypes = {
  formData: PropTypes.array,
  schema: PropTypes.object.isRequired,

  setResource: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(Resources);