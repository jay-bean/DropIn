import { useEffect, useState } from 'react';
import { getTags } from '../../store/parktag';
import { Multiselect } from "multiselect-react-dropdown";

function TagSelect({ selectedTag, setSelectedTag, tagIdArr }) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    (async () =>{
      const allTags = await getTags();
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
    <div className='select-container'>
      <Multiselect
        className='tag-select-comp'
        options={tags}
        displayValue="label"
        selectedValues={tagIdArr ? tags.filter(tag => tagIdArr.includes(tag.value)): ''}
        onSelect={tagHandler}
        onRemove={tagHandler}
        on
      />
    </div>
  );
}

export default TagSelect;
