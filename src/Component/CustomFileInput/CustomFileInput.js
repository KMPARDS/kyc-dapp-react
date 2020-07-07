import React, { Component } from "react";
import './CustomFileInput.css';
import { Row, Col } from "react-bootstrap";
import Images from "../../Container/Images/Images";


export default class CustomFileInput extends Component {
  name = '';

  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    name: '',
    text: undefined,
    file: undefined,
    imagePreviewUrl: Images.path.plusimg
  };

  componentDidMount() {
    const { name } = this.props.field;
    this.name = name;
  }

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleChange(e) {
    const { onChange } = this.props.field;
    e.preventDefault();
    switch (e.target.type) {
      case 'file':

        let file = e.target.files[0];
        if (file) {
          this.readFile(file);
          this.props.setFieldValue(this.props.field.name, file);
        }
        break;
      case 'text':
        onChange(e);
        break;
      default:
        break;
    }
  }

  readFile(file){
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  componentWillReceiveProps(props) {
    const { field: { name }, type, value, errors, touched } = props;
    const newValues = {}
    if (type === 'file'
      && this.name === name
      && value
      && this.state.imagePreviewUrl !== value){
        if(typeof value === 'string')
          newValues.imagePreviewUrl = value;
        else if(typeof value === 'object')
          this.readFile(value);
      }

    if(this.name === name && errors[this.name] && touched[this.name])
      newValues.error = errors[this.name];
    else newValues.error = null;

    this.setState({
      ...newValues
    });
  }

  render() {
    const { title, description, type, placeholder, errors, touched, value } = this.props;
    const { name, onBlur } = this.props.field;
    return (
      <div className="form-group">
        <label for={name}>{title}</label>
        {description && <p className="note-para">{description}</p>}

        <input
          id={name}
          name={name}
          type={type}
          className={type === 'file' ? "hidden" : ('form-control' + (errors && errors[name] && touched[name] ? ' is-invalid' : ''))}
          placeholder={placeholder}
          onChange={this.handleChange}
          ref={this.fileUpload}
          onBlur={onBlur}
          value={type === 'text' ? value : null}
        />
        {this.state.error && (
          <div className="error">
            {this.state.error}
          </div>
        )}

        {type === 'file' &&
          <Row>
            <Col sm={5}>
              <div className="border-style-img" onClick={this.showFileUpload}>
                <img className='kycdapp-plus-Img' src={this.state.imagePreviewUrl} alt="" />
              </div>
            </Col>
          </Row>}
      </div>
    );
  }
}

