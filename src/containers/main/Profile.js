import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isEmpty } from 'react-redux-firebase'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styles from '../../assets/style/themes/pages/mainMenu.scss'
import { patientAction } from './../../redux/actions/patient'

// moment.locale('th-TH')

class ProfileComponent extends Component {
  // componentWillMount() {
  //   const { configs } = { ...this.props }
  //   console.log('Component Will Mouint')
  //   console.log(configs)
  //   this.props.getPatient()
  // }
  // componentDidMount() {
  //   const { patientId, avatarUrl, patients, configs } = { ...this.props }
  //   console.log(patientId, avatarUrl, patients, configs)
  // }

  render() {
    const { patientId, avatarUrl, patients, configs } = { ...this.props }
    if (isEmpty(patients)) {
      this.props.getPatient(configs, patientId)
    }
    return (
      isEmpty(patients)
        ? <div className={styles.profile}>
          <span>Profile Loading...</span>
        </div>
        : <div className={styles.profile}>
          <div className={`${styles.item} ${styles.image}`}>
            <div className={styles.userImage}>
              <img src={avatarUrl} alt='Logo' />
            </div>
          </div>
          <div className={`${styles.item} ${styles.profileName}`}>
            <Link className={styles.item} to='/profile'>
              <span className={styles.nameLabel}> {`${patients.prename}${patients.name} ${patients.surname}`}</span>
              <span className={`iconBack ${styles.nameMore}`} />
            </Link>
          </div>
          <div className={`profileColumns ${styles.profileInfo}`}>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{moment(patients.dob).format('L')}</div>
              <div className={styles.labelInfo}>Birthday</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{patients.weight}</div>
              <div className={styles.labelInfo}>Weight</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{patients.height}</div>
              <div className={styles.labelInfo}>Height</div>
            </div>
            <div className={`${styles.itemInfo} ${styles.blood} iconBlood`} ><span className={styles.bloodLabel} />{patients.bloodGroup}</div>
            <div className={`${styles.itemInfo} ${styles.sex} ${patients.sex === 'M' ? 'iconMale' : 'Female'}`} />
          </div>
        </div>
    )
  }
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data,
    configs: state.firebase.data.configs
  }
)

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileComponent)
