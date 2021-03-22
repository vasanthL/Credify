import axios from 'axios'

const gcpLevelNames = ['Associate','Professional']
const awsLevelNames = ['Foundational','Associate','Professional','Specialty']
const azureLevelNames = ['Fundamenatals','Professional','Expert']
const awsCertNames = [
  'Certified Cloud Practitioner',
  'Certified Developer',
  'Certified Solutions Architect',
  'Certified Sysops Administrator',
  'Certified Devops Engineer',
  'Certified Solutions Architect',
  'Certified Advanced Networking',
  'Certified Alexa Skill Builder',
  'Certified Data Analytics',
  'Certified Database',
  'Certified Machine Learning',
  'Certified Security'
]
const azureCertNames = [
  'Certified Azure',
  'Azure AI',
  'Azure Data',
  'Azure Administrator',
  'Azure AI Engineer',
  'Azure Database Administrator',
  'Azure Dataengineer',
  'Azure Data Scientist',
  'Azure Developer',
  'Azure Security engineer',
  'Azure Devops Engineer',
  'Solutions Architect'
]

const gcpCertNames = [
  'Associate Cloud Engineer',
  'Professional Cloud Architect',
  'Professional Cloud Developer',
  'Professional Cloud Devops Engineer',
  'Professional Cloud Network Engineer',
  'Professional Cloud Security Engineer',
  'Professional Collaboration Engineer'
]


export const getStats = (
  SBU,
  setUsersList,
  setUsersTotal,
  setCertsTotal,
  setCspTotal,
  setGcpLevelTotal,
  setAwsLevelTotal,
  setAzureLevelTotal,
  setGCPCertNamesTotal,
  setAWSCertNamesTotal,
  setAzureCertNamesTotal) => {
  const url = 'https://credify.tk/adminhome'
  var options = {
    headers: {
      'Authorization': `TOKEN ${localStorage.getItem('token')}`
    }
  }
  const body = SBU ? SBU : null
  axios.post(url,{ 'sbu':body },options)
    .then(response => {
      console.log(response.data)
      const { GCP,AWS,Azure } = response.data
      const cspCount = [GCP.GCP_count,AWS.AWS_count,Azure.Azure_count]
      const awsLevelCount = [
        AWS.AWS_foundational.AWS_foundational_count,
        AWS.AWS_associate.AWS_associate_count,
        AWS.AWS_professional.AWS_professional_count,
        AWS.AWS_specialty.AWS_speciality_count
      ]
      const gcpLevelCount = [
        GCP.GCP_assocaite.GCP_associate_count,
        GCP.GCP_professional.GCP_professional_count,
      ]
      const azureLevelCount = [
        Azure.Azure_fundamentals.Azure_fundamentals_count,
        Azure.Azure_professional.Azure_professional_count,
        Azure.Azure_expert.Azure_expert_count,
      ]
      const awsCerts=[
        AWS.AWS_foundational.AWS_foundational_certs.AWS_AWScertifiedcloudpractitioner,
        AWS.AWS_associate.AWS_associate_certs.AWS_AWScertifieddeveloper,
        AWS.AWS_associate.AWS_associate_certs.AWS_AWScertifiedsolutionsarchitect,
        AWS.AWS_associate.AWS_associate_certs.AWS_AWScertifiedsysopsadministrator,
        AWS.AWS_professional.AWS_professional_certs.AWS_AWScertifieddevopsengineer,
        AWS.AWS_professional.AWS_professional_certs.AWS_AWScertifiedsolutionsarchitect,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifiedadvancednetworking,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifiedalexaskillbuilder,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifieddataanalytics,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifieddatabase,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifiedmachinelearning,
        AWS.AWS_specialty.AWS_speciality_certs.AWS_AWScertifiedsecurity,
      ]
      const gcpCerts=[
        GCP.GCP_assocaite.GCP_associate_certs.GCP_associatecloudengineer,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalcloudarchitect,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalclouddeveloper,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalclouddevopsengineer,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalcloudnetworkengineer,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalcloudsecurityengineer,
        GCP.GCP_professional.GCP_professional_certs.GCP_professionalcollaborationengineer,
      ]
      const azureCerts = [
        Azure.Azure_fundamentals.Azure_foundational_certs['Azure_certified:azure'],
        Azure.Azure_fundamentals.Azure_foundational_certs['Azure_microsoftcertified:azureai'],
        Azure.Azure_fundamentals.Azure_foundational_certs['Azure_microsoftcertified:azuredata'],
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazureadministrator,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazureaiengineer,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazuredatabaseadministrator,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazuredataengineer,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazuredatascientist,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazuredeveloper,
        Azure.Azure_professional.Azure_professional_certs.Azure_microsoftcertifiedazuresecurityengineer,
        Azure.Azure_expert.Azure_expert_certs.Azure_microsoftcertifiedcertifiedazuredevopsengineer,
        Azure.Azure_expert.Azure_expert_certs.Azure_microsoftcertifiedsolutionsarchitect
      ]
      setUsersList(response.data.users_count)
      setUsersTotal(response.data.users_count.length)
      setCertsTotal(response.data.certificates_count)
      setCspTotal(cspCount)
      setGcpLevelTotal(gcpLevelCount)
      setAwsLevelTotal(awsLevelCount)
      setAzureLevelTotal(azureLevelCount)
      setGCPCertNamesTotal(gcpCerts)
      setAWSCertNamesTotal(awsCerts)
      setAzureCertNamesTotal(azureCerts)
      console.log(gcpCerts)
    })
    .catch(error => {
      console.log(error)
    })
}

export {
  gcpLevelNames,
  awsLevelNames,
  azureLevelNames,
  gcpCertNames,
  awsCertNames,
  azureCertNames,
}

export const getAllUsers = (setAllUsers) => {
  const url = 'https://credify.tk/adminhome'
  var options = {
    headers: {
      'Authorization': `TOKEN ${localStorage.getItem('token')}`
    }
  }
  // const [response] = await Promise.all([
  //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${this.props.p1}`),
  // ]);

  axios.post(url,null,options)
    .then(response => {
      return axios.post('https://credify.tk/allusers',{ userids:response.data.users_count },options)
        .then(response => {
          console.log(response)
          setAllUsers(response.data)
        })
        .catch(function (error) {
          console.log(error.response.status,error.response)
        })

    })
    .catch(error => {
      console.log(error)
    })
}

export const getQuizRank = (id,setRank) => {
  const url = 'https://credify.tk/rankings'
  var options = {
    headers: {
      'Authorization': `TOKEN ${localStorage.getItem('token')}`
    }
  }
  axios.get(url,options)
    .then(response => {
      response.data.forEach((rank,index) => {
        console.log('ranks:',rank.id,id)
        if(rank.id===id){
          setRank(index+1)
        }
      })
    }).catch(error => {
      console.log(error)
    })
}