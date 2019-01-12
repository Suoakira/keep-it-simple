import React from 'react'
import { Table } from 'semantic-ui-react'

const HistoryRow = (props) => (

    <Table.Row>
        <Table.Cell>{new Date(props.startDate).toDateString()} {props.daysToGo}</Table.Cell>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.category}</Table.Cell>
        <Table.Cell>{props.amount}</Table.Cell>
    </Table.Row>
)

export default HistoryRow

