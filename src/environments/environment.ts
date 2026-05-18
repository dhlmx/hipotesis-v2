export const SERVER = 'http://localhost',

environment = {
  production: false,
  api: {
    host: SERVER,
    basePath: 'hipotesis-api',
    parameters: {
      where: '&where=',
      orderBy: '&orderBy='
    },
    resources: {
      getTable: 'repository/model/getTable.php?table=',
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
  resources: {
    mindMaps: 'resources/mind_maps',
    photos: 'resources/images'
  }
};
