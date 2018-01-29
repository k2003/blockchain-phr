import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import moment from 'moment'

require('moment/locale/th')
const CardComponent = (props) => {
  const data = props.data
  const { dateTimeService, healthCareProviderData } = { ...data }
  return (
    <div>
      <ListItem
        primaryText={moment(dateTimeService).format('LL')}
        secondaryText={healthCareProviderData[0].healthCareProviderName}
        secondaryTextLines={2}
      />
      <Divider />
    </div>

  )
}

export default CardComponent
