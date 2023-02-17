# App Components
These components are used in this project as a custom library

## Carousel
### Props
| Name          | Type      | Default   | Description 
| ------------- | ----------| --------- | ----------- 
| children      | node      |           | The content of the component.
| duration      | number    | 400       | The transition duration of each slide.
| autoplay      | bool      | `true`    | If `false`, the carousel slides manually only.
| delay         | number    | 2000      | The transition delay of each slide.

## Multistep
### Props
| Name          | Type            | Default   | Description 
| ------------- | --------------- | --------- | ----------- 
| children      | node            |           | The content of the component.
| headers       | Array<`string`> |           | The steps name.
| value         | object          |           | The value of each step.
| onFinish      | function        |           | The function that submit multistep form.
| onTurnBack    | function        |           | The function back to the previous step.
| autoNext      | bool            | `false`   | If `true`, come to next step after select.
| ...props      | ReactPropsType  |           | Other props also be accepted.

The `ref` is forwarded to the container element.

## Select
### Props
| Name          | Type                             | Default   | Description 
| ------------- | -------------------------------- | --------- | ----------- 
| editable      | bool                             | `true`    | If `false`, user cannot select value from option list.
| label         | string                           |           | Name of selection.
| defaultValue  | string, number                   |           | The default value/option of the selection.
| placeholder   | string                           | `'Choose'`| The placeholder of select.
| renderData    | Array<`string`>, Array<`number`> | `[]`      | The list of options.
| onSelect      | function                         |           | The function change current selected value.
| classNames    | string                           |           | Override or extend the styles applied to the component.
| ...props      | ReactPropsType                   |           | Other props also be accepted.

## Table
### Props
| Name          | Type             | Default   | Description 
| ------------- | ---------------- | --------- | ----------- 
| headers       | Array<`string`>  |           | The list of headers of a table.
| pagination    | bool             | `false`   | If `true`, display and active pagintion as a table footer.
| rowPerPage    | number           | 5         | The number of rows that displayed on each page of table.
| data          | Array<`any`>     |           | The data to render to the table.
| renderItem    | ReactElement     |           | The element to render to each row, it must be valid `tr` element.
| keyExtractor  | function         |           | The function that extract the key of each element of render list.

## Toast
### Props
| Name          | Type           | Default   | Description 
| ------------- | ---------------| --------- | ----------- 
| variant       | `'fill'`       |           | The variant of toast message. If `'fill'`, set background of toast to current type, white otherwise.
| autoClose     | bool           | `true`    | If `false`, user must close it manually.
| delay         | number         | 3000      | The toast will be disappeared after `delay`ms when `autoClose` set to `true`.
| duration      | number         | 300       | The transition time of each toast message.
| timeline      | bool           | `true`    | If `false`, hide the count down timeline during `delay`ms. It only available when `autoClose` set to `true`.

The `ref` is forwarded to the container element.