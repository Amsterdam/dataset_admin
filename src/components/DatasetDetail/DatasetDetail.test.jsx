import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DatasetDetail from './DatasetDetail';
import schema from './__mocks__/schema.json';
import uiDataset from './__mocks__/uiDataset';

const middlewares = [thunk];

describe('The DatasetDetail component', () => {
  let store;
  let wrap;
  let datasetTitle;
  let setModalSpy;

  beforeEach(() => {
    store = configureMockStore(middlewares)();
    setModalSpy = jest.fn();
    datasetTitle = '';
    wrap = shallow((
      <DatasetDetail
        schema={schema}
        uiDataset={uiDataset}
        formData={{}}
        datasetTitle={datasetTitle}
        setModal={setModalSpy}
      />
    ), { context: { store } }).dive();
  });

  describe('renders component', () => {
    it('renders default props', () => {
      expect(wrap).toMatchSnapshot();
    });
  });
});
