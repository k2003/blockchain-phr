
import React, { Component } from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { Link } from 'react-router-dom'
// import {blue500} from 'material-ui/styles/colors';

import { Variable } from '../../../assets/style/vendors/materialUI/js/index'
require('moment/locale/th')

class ListComponent extends Component {
  render() {
    const { val } = { ...this.props }
    const data = val.item
    const iconList = (<ActionInfo color={Variable.colors.notifi} />)

    if (data) {
      return (
        <List>
          <Link to={{
            pathname: `/requestpermission/${val.id}`,
            state: { data }
          }}>
            <ListItem
              primaryText={data.healthCareProviderData[0].healthCareProviderName}
              secondaryText={
                  <span>{moment(val.actionDateTime).format('LLL')}</span>
              }
              rightIcon={
                data.patientAcknowledgeDateTime ? null : iconList
              }
              secondaryTextLines={1}
            />
          </Link>
          <Divider />
        </List >
      )
    } else {
      return null
    }
  }
}
export default ListComponent
