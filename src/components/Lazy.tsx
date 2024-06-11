import React from 'react';
interface LazyProps {
  name: string
}
const lazy: React.FC<LazyProps> = ({name}) => <h3>{name}</h3>

export default lazy