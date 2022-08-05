import { useEffect, useState } from 'react';
import { getTags } from '../../store/parktag';
import { Multiselect } from "multiselect-react-dropdown";

function TagSelect({ selectedTag, setSelectedTag, tagIdArr }) {
  const [tags, setTags] = useState([]);
  console.log(selectedTag, 'selected options to send back')
  useEffect(() => {
    (async () =>{
      const allTags = await getTags();
      console.log(allTags, 'allllll')
      const formattedTags = allTags.map(tag => {
        return ({
          value: tag.id,
          label: tag.type
        });
      })
      setTags(formattedTags)
    })();
  }, [])

  const tagHandler = (e) => {
    setSelectedTag(Array.isArray(e) ? e.map(tag => tag.value) : null);
  }

  return (
    <Multiselect
      options={tags}
      displayValue="label"
      selectedValues={tagIdArr ? tags.filter(tag => tagIdArr.includes(tag.value)): ''}
      onSelect={tagHandler}
      onRemove={tagHandler}
      on
    />
  );
}

export default TagSelect;
