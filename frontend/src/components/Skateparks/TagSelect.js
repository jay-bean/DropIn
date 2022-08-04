import Select from 'react-select';

function TagSelect({ selectedTag, setSelectedTag }) {

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

  const tagHandler = (e) => {
    setSelectedTag(Array.isArray(e) ? e.map(tag => tag.value) : null);
    console.log(selectedTag)
  }

  return (<Select
  className="dropdown"
  placeholder="Select Option"
  value={tagOptions.filter(tagOptions => selectedTag.includes(tagOptions.value))}
  options={tagOptions}
  onChange={tagHandler}
  isMulti={true}
  isClearable={true}
  />);
}

export default TagSelect;
