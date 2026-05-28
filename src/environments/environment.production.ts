export const SERVER = 'https://hipotesis.org.mx',

environment = {
  production: true,
  api: {
    host: SERVER,
    basePath: 'hipotesis-api',
    resources: {
      getTable: 'repository/model/getTable.php',
      postExecuteSQLQuery: 'repository/model/postExecuteSQLQuery.php',
      postUploadFile: 'repository/model/postUploadFile.php'
    }
  },
  defaultValues: {
    countryId: 58,
    topicId: 8,
    languageId: 2,
    formatId: 3,
    sourceId: 1
  },
  export: {
    telegram: {
      bold: '**',
      cursive: '__',
      strike: '~'
    },
    whatsapp: {
      bold: '*',
      cursive: '_',
      strike: ''
    }
  },
  publicHtml: {
    base: 'hipotesis/resources',
    mindMaps: 'mind_maps',
    photos: 'images'
  }
};
