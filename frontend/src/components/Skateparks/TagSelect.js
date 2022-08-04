import Select from 'react-select';

function TagSelect({ selectedTag, setSelectedTag, tagIdArr }) {
  console.log(selectedTag, 'selected tag');
  const tagOptions = [
    {
      value: 1,
      label: 'Half pipe'
    },
    {
      value: 2,
      label: 'Bowl'
    },
    {
      value: 3,
      label: 'Pool'
    },
    {
      value: 4,
      label: 'Snake run'
    },
    {
      value: 5,
      label: 'Street'
    },
    {
      value: 6,
      label: 'Rails'
    },
    {
      value: 7,
      label: 'Ledges'
    },
    {
      value: 8,
      label: 'Pump Track'
    },
  ];

  // console.log(tagOptions.filter(tag => tagIdArr.includes(tag.value)), 'tagoptions');


  const tagHandler = (e) => {
    setSelectedTag(Array.isArray(e) ? e.map(tag => tag.value) : null);
  }

  return (
    <Select
      className="dropdown"
      placeholder="Select Option"
      defaultValue={tagIdArr ? tagOptions.filter(tag => tagIdArr.includes(tag.value)) : ''}
      value={tagOptions.filter(tag => selectedTag.includes(tag.value))}
      options={tagOptions}
      onChange={tagHandler}
      isMulti={true}
      isClearable={true}
    />
  );
}

export default TagSelect;
