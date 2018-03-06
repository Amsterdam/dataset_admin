import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import { fetchDataset } from '../actions/dataset';
import localFields from '../fields';
import widgets from '../widgets';

import '../../node_modules/react-day-picker/lib/style.css';
import './dcatd-form.scss';

const fields = {
  ...extraFields,
  ...localFields
};

const mapStateToProps = state => ({
  dataset: state.dataset
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDataset
}, dispatch);

class DatasetDetail extends Component {
  componentDidMount() {
    if (this.props.id) {
      this.props.fetchDataset(this.props.id);
    }
  }

  render() {
    return (
      <div>
        <Form
          className="dcatd-form dataset-form"
          schema={this.props.schema}
          formData={this.props.id ? this.props.dataset : {}}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiDataset}
          noHtml5Validate
          showErrorList={false}
          onChange={({ formData }) => console.log('CHANGE', formData)}
        />
      </div>
    );
  }
}

DatasetDetail.defaultProps = {
  id: null
};

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  id: PropTypes.string,
  dataset: PropTypes.object.isRequired,

  fetchDataset: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetail);
