import { IChild } from '../../interfaces/math/ichild';
import { ITecnology } from '../../interfaces/itecnology';
import { ISelect } from '../../interfaces/iselect';

export const ADELA = 'Adela',
  ADELA_ID = 'Ad',
  ADELA_COUPLE = 'Pareja de Adela',
  ADELA_COUPLE_ID = '(+Ad)',
  ALONDRA = 'Alondra',
  ALONDRA_ID = 'Al',
  ALONDRA_COUPLE = 'Pareja de Alondra',
  ALONDRA_COUPLE_ID = '(+Al)',
  ANABEL = 'Anabel',
  ANABEL_ID = 'An',
  ANABEL_COUPLE = 'Pareja de Anabel',
  ANABEL_COUPLE_ID = '(+An)',
  BARBARA = 'Bárbara',
  BARBARA_ID = 'Ba',
  BARBARA_COUPLE = 'Pareja de Bárbara',
  BARBARA_COUPLE_ID = '(+Ba)',
  BERTHA = 'Bertha',
  BERTHA_ID = 'Be',
  BERTHA_COUPLE = 'Pareja de Bertha',
  BERTHA_COUPLE_ID = '(+Be)',
  CONDESA = 'Condesa',
  CONDESA_ID = 'Co',
  CONDE_MAYOR = 'Conde Mayor',
  CONDE_MAYOR_ID = 'CMay',
  CONDE_MENOR = 'Conde Menor',
  CONDE_MENOR_ID = 'CMen',
  DUQUESA = 'Duquesa',
  DUQUESA_ID = 'Duq',
  ENRIQUE = 'Enrique',
  ENRIQUE_ID = 'En',
  ENRIQUE_COUPLE = 'Pareja de Enrique',
  ENRIQUE_COUPLE_ID = '(+En)',
  ESTEBAN = 'Esteban',
  ESTEBAN_ID = 'Es',
  ESTEBAN_COUPLE = 'Pareja de Esteban',
  ESTEBAN_COUPLE_ID = '(+Es)',
  NODES = [
    {
      id: '1',
      label: 'Node A'
    },
    {
      id: '2',
      label: 'Node B'
    },
    {
      id: '3',
      label: 'Node C'
    },
    {
      id: '4',
      label: 'Node D'
    },
    {
      id: '5',
      label: 'Node E'
    },
    {
      id: '6',
      label: 'Node F'
    }
  ],
  EDGES = [
    {
      id: 'a',
      source: '1',
      target: '2'
    },
    {
      id: 'b',
      source: '1',
      target: '3'
    },
    {
      id: 'c',
      source: '3',
      target: '4'
    },
    {
      id: 'd',
      source: '3',
      target: '5'
    },
    {
      id: 'e',
      source: '4',
      target: '5'
    },
    {
      id: 'f',
      source: '2',
      target: '6'
    }
  ],
  CLUSTERS = [
    {
      id: 'cluster0',
      label: 'Cluster node',
      childNodeIds: ['2', '3']
    }
  ],
  BARS_DATA = [
    {Date: new Date('2013-05-13'), Open: 64.501427, High: 65.414284, Low: 64.500000, Close: 64.962860, Volume: 79237200},
    {Date: new Date('2013-05-14'), Open: 64.835716, High: 65.028572, Low: 63.164288, Close: 63.408573, Volume: 111779500},
    {Date: new Date('2013-05-15'), Open: 62.737144, High: 63.000000, Low: 60.337143, Close: 61.264286, Volume: 185403400},
    {Date: new Date('2013-05-16'), Open: 60.462856, High: 62.549999, Low: 59.842857, Close: 62.082859, Volume: 150801000},
    {Date: new Date('2013-05-17'), Open: 62.721428, High: 62.869999, Low: 61.572857, Close: 61.894287, Volume: 106976100}
  ],
  TIDY_TREE_DATA = [
    {source: 'Microsoft', target: 'Amazon', type: 'licensing'},
    {source: 'Microsoft', target: 'HTC', type: 'licensing'},
    {source: 'Samsung', target: 'Apple', type: 'suit'},
    {source: 'Motorola', target: 'Apple', type: 'suit'},
    {source: 'Nokia', target: 'Apple', type: 'resolved'},
    {source: 'HTC', target: 'Apple', type: 'suit'},
    {source: 'Kodak', target: 'Apple', type: 'suit'},
    {source: 'Microsoft', target: 'Barnes & Noble', type: 'suit'},
    {source: 'Microsoft', target: 'Foxconn', type: 'suit'},
    {source: 'Oracle', target: 'Google', type: 'suit'},
    {source: 'Apple', target: 'HTC', type: 'suit'},
    {source: 'Microsoft', target: 'Inventec', type: 'suit'},
    {source: 'Samsung', target: 'Kodak', type: 'resolved'},
    {source: 'LG', target: 'Kodak', type: 'resolved'},
    {source: 'RIM', target: 'Kodak', type: 'suit'},
    {source: 'Sony', target: 'LG', type: 'suit'},
    {source: 'Kodak', target: 'LG', type: 'resolved'},
    {source: 'Apple', target: 'Nokia', type: 'resolved'},
    {source: 'Qualcomm', target: 'Nokia', type: 'resolved'},
    {source: 'Apple', target: 'Motorola', type: 'suit'},
    {source: 'Microsoft', target: 'Motorola', type: 'suit'},
    {source: 'Motorola', target: 'Microsoft', type: 'suit'},
    {source: 'Huawei', target: 'ZTE', type: 'suit'},
    {source: 'Ericsson', target: 'ZTE', type: 'suit'},
    {source: 'Kodak', target: 'Samsung', type: 'resolved'},
    {source: 'Apple', target: 'Samsung', type: 'suit'},
    {source: 'Kodak', target: 'RIM', type: 'suit'},
    {source: 'Nokia', target: 'Qualcomm', type: 'suit'}
  ],
  TECNOLOGIES_DATA: ITecnology[] = [
      { framework: 'Vue', stars: 166443, released: 2014 },
      { framework: 'React', stars: 150793, released: 2013 },
      { framework: 'Angular', stars: 62342, released: 2016 },
      { framework: 'Backbone', stars: 27647, released: 2010 },
      { framework: 'Ember', stars: 21471, released: 2011 }
  ],
  TREE_DATA: IChild = {
    name: 'Eve',
    value: 15,
    type: 'black',
    level: 'yellow',
    children: [
      {
        name: 'Cain',
        value: 10,
        type: 'grey',
        level: 'red'
      },
      {
        name: 'Seth',
        value: 10,
        type: 'grey',
        level: 'red',
        children: [
          {
            name: 'Enos',
            value: 7.5,
            type: 'grey',
            level: 'purple'
          },
          {
            name: 'Noam',
            value: 7.5,
            type: 'grey',
            level: 'purple'
          }
        ]
      },
      {
        name: 'Abel',
        value: 10,
        type: 'grey',
        level: 'blue'
      },
      {
        name: 'Awan',
        value: 10,
        type: 'grey',
        level: 'green',
        children: [
          {
            name: 'Enoch',
            value: 7.5,
            type: 'grey',
            level: 'orange'
          }
        ]
      },
      {
        name: 'Azura',
        value: 10,
        type: 'grey',
        level: 'green'
      }
    ]
  },
  RADIAL_TREE_DATA = {
    nodes: [
      {id: 'Myriel', group: 1},
      {id: 'Napoleon', group: 1},
      {id: 'Labarre', group: 2},
      {id: 'Valjean', group: 2},
      {id: 'Marguerite', group: 3},
      {id: 'Listolier', group: 3}
    ],
    links: [
      {source: 'Napoleon', target: 'Myriel', value: 1},
      {source: 'Valjean', target: 'Labarre', value: 1},
      {source: 'Marguerite', target: 'Valjean', value: 1},
      {source: 'Valjean', target: 'Myriel', value: 5},
      {source: 'Listolier', target: 'Marguerite', value: 3},
      {source: 'Valjean', target: 'Marguerite', value: 4}
    ]
  },
FLARE_DATA = {
  name: "flare",
  children: [
    {
      name: "analytics",
      children: [
        {
          name: "cluster",
          children: [
            { name: "AgglomerativeCluster", value: 3938 },
            { name: "CommunityStructure", value: 3812 },
            { name: "HierarchicalCluster", value: 6714 },
            { name: "MergeEdge", value: 743 }
          ]
        },
        {
          name: "graph",
          children: [
            { name: "BetweennessCentrality", value: 3534 },
            { name: "LinkDistance", value: 5731 },
            { name: "MaxFlowMinCut", value: 7840 },
            { name: "ShortestPaths", value: 5914 },
            { name: "SpanningTree", value: 3416 }
          ]
        },
        {
          name: "optimization",
          children: [{ name: "AspectRatioBanker", value: 7074 }]
        }
      ]
    },
    {
      name: "animate",
      children: [
        { name: "Easing", value: 17010 },
        { name: "FunctionSequence", value: 5842 },
        {
          name: "interpolate",
          children: [
            { name: "ArrayInterpolator", value: 1983 },
            { name: "ColorInterpolator", value: 2047 },
            { name: "DateInterpolator", value: 1375 },
            { name: "Interpolator", value: 8746 },
            { name: "MatrixInterpolator", value: 2202 },
            { name: "NumberInterpolator", value: 1382 },
            { name: "ObjectInterpolator", value: 1629 },
            { name: "PointInterpolator", value: 1675 },
            { name: "RectangleInterpolator", value: 2042 }
          ]
        },
        { name: "ISchedulable", value: 1041 },
        { name: "Parallel", value: 5176 },
        { name: "Pause", value: 449 },
        { name: "Scheduler", value: 5593 },
        { name: "Sequence", value: 5534 },
        { name: "Transition", value: 9201 },
        { name: "Transitioner", value: 19975 },
        { name: "TransitionEvent", value: 1116 },
        { name: "Tween", value: 6006 }
      ]
    },
    {
      name: "data",
      children: [
        {
          name: "converters",
          children: [
            { name: "Converters", value: 721 },
            { name: "DelimitedTextConverter", value: 4294 },
            { name: "GraphMLConverter", value: 9800 },
            { name: "IDataConverter", value: 1314 },
            { name: "JSONConverter", value: 2220 }
          ]
        },
        { name: "DataField", value: 1759 },
        { name: "DataSchema", value: 2165 },
        { name: "DataSet", value: 586 },
        { name: "DataSource", value: 3331 },
        { name: "DataTable", value: 772 },
        { name: "DataUtil", value: 3322 }
      ]
    },
    {
      name: "display",
      children: [
        { name: "DirtySprite", value: 8833 },
        { name: "LineSprite", value: 1732 },
        { name: "RectSprite", value: 3623 },
        { name: "TextSprite", value: 10066 }
      ]
    },
    {
      name: "flex",
      children: [{ name: "FlareVis", value: 4116 }]
    },
    {
      name: "physics",
      children: [
        { name: "DragForce", value: 1082 },
        { name: "GravityForce", value: 1336 },
        { name: "IForce", value: 319 },
        { name: "NBodyForce", value: 10498 },
        { name: "Particle", value: 2822 },
        { name: "Simulation", value: 9983 },
        { name: "Spring", value: 2213 },
        { name: "SpringForce", value: 1681 }
      ]
    },
    {
      name: "query",
      children: [
        { name: "AggregateExpression", value: 1616 },
        { name: "And", value: 1027 },
        { name: "Arithmetic", value: 3891 },
        { name: "Average", value: 891 },
        { name: "BinaryExpression", value: 2893 },
        { name: "Comparison", value: 5103 },
        { name: "CompositeExpression", value: 3677 },
        { name: "Count", value: 781 },
        { name: "DateUtil", value: 4141 },
        { name: "Distinct", value: 933 },
        { name: "Expression", value: 5130 },
        { name: "ExpressionIterator", value: 3617 },
        { name: "Fn", value: 3240 },
        { name: "If", value: 2732 },
        { name: "IsA", value: 2039 },
        { name: "Literal", value: 1214 },
        { name: "Match", value: 3748 },
        { name: "Maximum", value: 843 },
        {
          name: "methods",
          children: [
            { name: "add", value: 593 },
            { name: "and", value: 330 },
            { name: "average", value: 287 },
            { name: "count", value: 277 },
            { name: "distinct", value: 292 },
            { name: "div", value: 595 },
            { name: "eq", value: 594 },
            { name: "fn", value: 460 },
            { name: "gt", value: 603 },
            { name: "gte", value: 625 },
            { name: "iff", value: 748 },
            { name: "isa", value: 461 },
            { name: "lt", value: 597 },
            { name: "lte", value: 619 },
            { name: "max", value: 283 },
            { name: "min", value: 283 },
            { name: "mod", value: 591 },
            { name: "mul", value: 603 },
            { name: "neq", value: 599 },
            { name: "not", value: 386 },
            { name: "or", value: 323 },
            { name: "orderby", value: 307 },
            { name: "range", value: 772 },
            { name: "select", value: 296 },
            { name: "stddev", value: 363 },
            { name: "sub", value: 600 },
            { name: "sum", value: 280 },
            { name: "update", value: 307 },
            { name: "variance", value: 335 },
            { name: "where", value: 299 },
            { name: "xor", value: 354 },
            { name: "_", value: 264 }
          ]
        },
        { name: "Minimum", value: 843 },
        { name: "Not", value: 1554 },
        { name: "Or", value: 970 },
        { name: "Query", value: 13896 },
        { name: "Range", value: 1594 },
        { name: "StringUtil", value: 4130 },
        { name: "Sum", value: 791 },
        { name: "Variable", value: 1124 },
        { name: "Variance", value: 1876 },
        { name: "Xor", value: 1101 }
      ]
    },
    {
      name: "scale",
      children: [
        { name: "IScaleMap", value: 2105 },
        { name: "LinearScale", value: 1316 },
        { name: "LogScale", value: 3151 },
        { name: "OrdinalScale", value: 3770 },
        { name: "QuantileScale", value: 2435 },
        { name: "QuantitativeScale", value: 4839 },
        { name: "RootScale", value: 1756 },
        { name: "Scale", value: 4268 },
        { name: "ScaleType", value: 1821 },
        { name: "TimeScale", value: 5833 }
      ]
    },
    {
      name: "util",
      children: [
        { name: "Arrays", value: 8258 },
        { name: "Colors", value: 10001 },
        { name: "Dates", value: 8217 },
        { name: "Displays", value: 12555 },
        { name: "Filter", value: 2324 },
        { name: "Geometry", value: 10993 },
        {
          name: "heap",
          children: [
            { name: "FibonacciHeap", value: 9354 },
            { name: "HeapNode", value: 1233 }
          ]
        },
        { name: "IEvaluable", value: 335 },
        { name: "IPredicate", value: 383 },
        { name: "IValueProxy", value: 874 },
        {
          name: "math",
          children: [
            { name: "DenseMatrix", value: 3165 },
            { name: "IMatrix", value: 2815 },
            { name: "SparseMatrix", value: 3366 }
          ]
        },
        { name: "Maths", value: 17705 },
        { name: "Orientation", value: 1486 },
        {
          name: "palette",
          children: [
            { name: "ColorPalette", value: 6367 },
            { name: "Palette", value: 1229 },
            { name: "ShapePalette", value: 2059 },
            { name: "SizePalette", value: 2291 }
          ]
        },
        { name: "Property", value: 5559 },
        { name: "Shapes", value: 19118 },
        { name: "Sort", value: 6887 },
        { name: "Stats", value: 6557 },
        { name: "Strings", value: 22026 }
      ]
    },
    {
      name: "vis",
      children: [
        {
          name: "axis",
          children: [
            { name: "Axes", value: 1302 },
            { name: "Axis", value: 24593 },
            { name: "AxisGridLine", value: 652 },
            { name: "AxisLabel", value: 636 },
            { name: "CartesianAxes", value: 6703 }
          ]
        },
        {
          name: "controls",
          children: [
            { name: "AnchorControl", value: 2138 },
            { name: "ClickControl", value: 3824 },
            { name: "Control", value: 1353 },
            { name: "ControlList", value: 4665 },
            { name: "DragControl", value: 2649 },
            { name: "ExpandControl", value: 2832 },
            { name: "HoverControl", value: 4896 },
            { name: "IControl", value: 763 },
            { name: "PanZoomControl", value: 5222 },
            { name: "SelectionControl", value: 7862 },
            { name: "TooltipControl", value: 8435 }
          ]
        },
        {
          name: "data",
          children: [
            { name: "Data", value: 20544 },
            { name: "DataList", value: 19788 },
            { name: "DataSprite", value: 10349 },
            { name: "EdgeSprite", value: 3301 },
            { name: "NodeSprite", value: 19382 },
            {
              name: "render",
              children: [
                { name: "ArrowType", value: 698 },
                { name: "EdgeRenderer", value: 5569 },
                { name: "IRenderer", value: 353 },
                { name: "ShapeRenderer", value: 2247 }
              ]
            },
            { name: "ScaleBinding", value: 11275 },
            { name: "Tree", value: 7147 },
            { name: "TreeBuilder", value: 9930 }
          ]
        },
        {
          name: "events",
          children: [
            { name: "DataEvent", value: 2313 },
            { name: "SelectionEvent", value: 1880 },
            { name: "TooltipEvent", value: 1701 },
            { name: "VisualizationEvent", value: 1117 }
          ]
        },
        {
          name: "legend",
          children: [
            { name: "Legend", value: 20859 },
            { name: "LegendItem", value: 4614 },
            { name: "LegendRange", value: 10530 }
          ]
        },
        {
          name: "operator",
          children: [
            {
              name: "distortion",
              children: [
                { name: "BifocalDistortion", value: 4461 },
                { name: "Distortion", value: 6314 },
                { name: "FisheyeDistortion", value: 3444 }
              ]
            },
            {
              name: "encoder",
              children: [
                { name: "ColorEncoder", value: 3179 },
                { name: "Encoder", value: 4060 },
                { name: "PropertyEncoder", value: 4138 },
                { name: "ShapeEncoder", value: 1690 },
                { name: "SizeEncoder", value: 1830 }
              ]
            },
            {
              name: "filter",
              children: [
                { name: "FisheyeTreeFilter", value: 5219 },
                { name: "GraphDistanceFilter", value: 3165 },
                { name: "VisibilityFilter", value: 3509 }
              ]
            },
            { name: "IOperator", value: 1286 },
            {
              name: "label",
              children: [
                { name: "Labeler", value: 9956 },
                { name: "RadialLabeler", value: 3899 },
                { name: "StackedAreaLabeler", value: 3202 }
              ]
            },
            {
              name: "layout",
              children: [
                { name: "AxisLayout", value: 6725 },
                { name: "BundledEdgeRouter", value: 3727 },
                { name: "CircleLayout", value: 9317 },
                { name: "CirclePackingLayout", value: 12003 },
                { name: "DendrogramLayout", value: 4853 },
                { name: "ForceDirectedLayout", value: 8411 },
                { name: "IcicleTreeLayout", value: 4864 },
                { name: "IndentedTreeLayout", value: 3174 },
                { name: "Layout", value: 7881 },
                { name: "NodeLinkTreeLayout", value: 12870 },
                { name: "PieLayout", value: 2728 },
                { name: "RadialTreeLayout", value: 12348 },
                { name: "RandomLayout", value: 870 },
                { name: "StackedAreaLayout", value: 9121 },
                { name: "TreeMapLayout", value: 9191 }
              ]
            },
            { name: "Operator", value: 2490 },
            { name: "OperatorList", value: 5248 },
            { name: "OperatorSequence", value: 4190 },
            { name: "OperatorSwitch", value: 2581 },
            { name: "SortOperator", value: 2023 }
          ]
        },
        { name: "Visualization", value: 16540 }
      ]
    }
  ]
},
BOOKS: ISelect[] = [
  { label: 'Matemáticas naturales', value: 'MN', inactive: false },
  { label: 'Algebra superior', value: 'AS', inactive: false }
],
PROBLEMS: ISelect[] = [
  { value: 'MN-01', label: '01.- ¿Cuántas palabras de tres letras se pueden formar si se dispone de un alfabeto con dos letras: a y b?', inactive: false },
  { value: 'MN-02', label: '02.- ¿Cuántos números enteros no negativos tienen 3 o menos dígitos? Nota: inclúyase el 0.', inactive: false },
  { value: 'MN-03', label: '03.- ¿Cuántas placas de carros hay si las placas se forman utilizando primero 3 letras y luego 2 dígitos?', inactive: false },
  { value: 'MN-04', label: '04.- ¿Cuántas "palabras" de longitud n se pueden formar usando el "alfabeto" {0, 1}?', inactive: false },
  { value: 'MN-05', label: '05.- De un grupo de 4 personas: A, B, C y D, se va a elegir un presidente y un secretario. ¿Cuántas posibilidades hay?', inactive: false },
  { value: 'MN-06', label: '06.- ¿De cuántas formas se pueden sentar 5 personas en 5 sillas numeradas?', inactive: false },
  { value: 'MN-07', label: '07.- ¿Cuántos números de tres cifras distintas hay?', inactive: false },
  { value: 'MN-08', label: '08.- De un grupo de 4 personas: A, B, C y D, se va a elegir dos. ¿Cuántas posibilidades hay?', inactive: false },
  { value: 'MN-09', label: '09.- Determinar las distintas formas de ordenar los números 1, 2, 3 y 4.', inactive: false },
  /*
  { value: 'MN-10', label: '10.- De un grupo de 5 personas A, B, C, D, E, se desea elegir una comisión de 3 personas. ¿Cuántas comisiones diferentes pueden escogerse?', inactive : false },
  { value: '', label: '', inactive : false },
  { value: '', label: '', inactive : false },
  { value: '', label: '', inactive : false },
  { value: '', label: '', inactive : false },
  { value: '', label: '', inactive : false },
  { value: '', label: '', inactive : false },
  */
];
