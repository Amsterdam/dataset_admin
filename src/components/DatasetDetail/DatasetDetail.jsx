import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-jsonschema-form';
import extraFields from 'react-jsonschema-form-extras';

import Modal from '../Modal/Modal';
import transformErrors from '../../services/transform-errors/transform-errors';
import localFields from '../../fields';
import widgets from '../../widgets';

import '../../../node_modules/react-day-picker/lib/style.css';
import '../dcatd-form.scss';
import './dataset-detail.scss';

const fields = {
  ...extraFields,
  ...localFields
};

class DatasetDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: props.dataset
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.hasDataset = this.hasDataset.bind(this);
    this.handleResourceToDataset = this.handleResourceToDataset.bind(this);
  }

  componentDidMount() {
    if (this.hasDataset()) {
      this.props.onFetch(this.props.id);
    } else {
      this.props.onEmpty();
    }
    this.props.onEmptyResource();
  }

  componentWillReceiveProps(props) {
    if (props.resourceToDataset['dcat:accessURL']) {
      this.handleResourceToDataset(props.resourceToDataset);
    } else {
      this.setState({
        dataset: { ...props.dataset }
      });
    }
  }

  handleResourceToDataset(resource) {
    let distributions = [...this.state.dataset['dcat:distribution']];
    if (resource['@id']) {
      distributions = distributions.map((distribution) => {
        if (distribution['@id'] === resource['@id']) {
          return { ...resource };
        }
        return { ...distribution };
      });
    } else {
      resource['@id'] = `_:${Math.random().toString(36).substr(2, 10)}`;
      distributions.push(resource);
    }

    this.setState({
      dataset: {
        ...this.state.dataset,
        'dcat:distribution': [...distributions]
      }
    });
  }

  hasDataset() {
    return this.props.id;
  }

  handleSubmit(event) {
    if (this.hasDataset()) {
      this.props.onUpdate(event.formData);
    } else {
      this.props.onCreate(event.formData);
    }
  }

  render() {
    const { dataset } = this.state;
    return (
      <div>
        <Form
          className="dcatd-form dataset-form"
          idPrefix="dataset"
          schema={this.props.schema}
          formData={dataset}
          widgets={widgets}
          fields={fields}
          uiSchema={this.props.uiDataset}
          noHtml5Validate
          showErrorList={false}
          transformErrors={transformErrors}
          onSubmit={event => this.handleSubmit(event)}
          onChange={event => console.log('DATASET CHANGE', event.formData)}
        >
          <div>
            <button
              className="dcatd-form-button dcatd-form-button-submit"
              type="submit"
            >
              Opslaan</button>
            <button
              className="dcatd-form-button dcatd-form-button-cancel"
              type="button"
            >
              Annuleren</button>
            {this.hasDataset() ?
              <Modal
                ref={(ref) => { this.modal = ref; }}
                content="Door de dataset te verwijderen, gaan alle gegevens verloren."
                actionLabel="Dataset verwijderen"
                trigger={(
                  <button
                    onClick={() => this.modal.handleShowState(true)}
                    type="button"
                    className="dcatd-form-button dcatd-form-button-remove"
                  >
                    Dataset verwijderen
                  </button>
                )}
                onProceed={() => {
                  this.props.onRemove(dataset);
                }}
              />
              : ''}
          </div>
        </Form>
      </div>
    );
  }
}

DatasetDetail.defaultProps = {
  id: null,
  dataset: {},
  resourceToDataset: {},

  onFetch: () => {},
  onEmpty: () => {},
  onCreate: () => {},
  onRemove: () => {},
  onUpdate: () => {},
  onEmptyResource: () => {}
};

DatasetDetail.propTypes = {
  schema: PropTypes.object.isRequired,
  uiDataset: PropTypes.object.isRequired,
  id: PropTypes.string,
  dataset: PropTypes.object,
  resourceToDataset: PropTypes.object,

  onFetch: PropTypes.func,
  onEmpty: PropTypes.func,
  onCreate: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  onEmptyResource: PropTypes.func
};

export default DatasetDetail;
