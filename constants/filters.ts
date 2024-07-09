import { FilterOptionsInterface } from '@/components/FilterModal';

const filterOptions: FilterOptionsInterface[] = [
  {
    filterLabel: 'Order',
    filterOptions: ['popular', 'latest'],
    mappingKey: 'order',
  },
  {
    filterLabel: 'Image Type',
    filterOptions: ['photo', 'illustration', 'vector'],
    mappingKey: 'image_type',
  },
  {
    filterLabel: 'Orientation',
    filterOptions: ['horizontal', 'vertical'],
    mappingKey: 'orientation',
  },
  {
    filterLabel: 'Color',
    filterOptions: [
      'red',
      'orange',
      'yellow',
      'green',
      'turquoise',
      'blue',
      'pink',
      'gray',
      'black',
      'brown',
    ],
    mappingKey: 'colors',
  },
];

export default filterOptions;
