import { dayPickerProps } from './day-picker';

export default {
  'ui:field': [
    'dropdown',
    'rte'
  ],
  'ui:widget': [
    'markdown',
    'file'
  ],

  'dcat:accessURL': {
    'ui:widget': 'file'
  },
  'ams:classification': {
    'ui:widget': 'hidden'
  },
  'dct:description': {
    'ui:field': 'rte',
    'ui:placeholder': 'tekst of markdown',
    rte: {
      format: 'markdown'
    }
  },
  'dct:identifier': {
    'ui:widget': 'hidden'
  },
  'dct:issued': {
    'ui:field': 'rdp',
    rdp: {
      placeholder: 'Kies een datum',
      dayPickerProps
    }
  },
  'foaf:isPrimaryTopicOf': {
    'dct:issued': {
      'ui:widget': 'hidden'
    },
    'dct:modified': {
      'ui:widget': 'hidden'
    }
  }
};
