
import React from 'react'
import { Input} from 'semantic-ui-react'

const SurveyField = (props) => {
    return (
        <Input {...props.input}/>
    )
}

export default SurveyField;