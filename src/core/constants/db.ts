export const DB = {
  daily: {
    table: 'daily',
    field: 'Daily',
    dailyId : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    remark: { required: true, max: 0, min: 0, maxLength: 20000, minLength: 1, pattern: '' },
    isActive: { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' }
  },
  mindMaps: {
    table: 'mind_maps',
    field: 'MindMap',
    mindMapId : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    categoryId : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    title : { required: true, max: 0, min: 0, maxLength: 200, minLength: 1, pattern: '' },
    subtitle : { required: true, max: 0, min: 0, maxLength: 400, minLength: 1, pattern: '' },
    author : { required: true, max: 0, min: 0, maxLength: 200, minLength: 1, pattern: '' },
    jpg : { required: true, max: 0, min: 0, maxLength: 400, minLength: 1, pattern: '' },
    png : { required: true, max: 0, min: 0, maxLength: 400, minLength: 1, pattern: '' },
    svg : { required: true, max: 0, min: 0, maxLength: 400, minLength: 1, pattern: '' },
    pdf : { required: true, max: 0, min: 0, maxLength: 400, minLength: 1, pattern: '' },
    isActive : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' }
  },
  mindMapCategories: {
    table: 'mind_map_categories',
    field: 'MindMapCategory',
    categoryId : { required: true, max: 0, min: 0, maxLength: 0, minLength: 0, pattern: '' },
    category : { required: true, max: 0, min: 0, maxLength: 200, minLength: 1, pattern: '' }
  }
};
