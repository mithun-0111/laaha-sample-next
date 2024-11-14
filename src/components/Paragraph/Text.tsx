const Text = (data: any) => {
  return (
    <div className="body-text" dangerouslySetInnerHTML={{ __html: data.field_description.value }} />
  )
}

export default Text