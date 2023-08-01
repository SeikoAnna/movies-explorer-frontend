import './LayoutBlock.css'


export default function LayoutBlock({headersTitle, className, id, children}) {
  return (
    <section className={className + ' layout-block'}>
      <h2 className={className + '__title' + ' layout-block__title'}>{headersTitle}</h2>

      <div className={className + "__content"}>
        {children}
      </div>
    </section>
  )
}