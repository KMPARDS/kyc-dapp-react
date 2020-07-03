import React, { Component } from "react";
import './CustomFileInput.css';
import { Row, Col } from "react-bootstrap";
import Images from "../../Container/Images/Images";

export default class CustomFileInput extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    text: undefined,
    file: undefined,
    imagePreviewUrl: Images.path.plusimg
  };

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
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
          reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          };
          reader.readAsDataURL(file);
          this.props.setFieldValue(this.props.field.name, file);
        }
        break;
      case 'text':
        break;
      default:
        break;
    }
    onChange(e);
  }



  componentDidMount() {
    console.log(this.fileUpload.current);
  }

  render() {
    const { title, description, type, placeholder, errors, touched } = this.props;
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
        />
        {errors && errors[name] && touched[name] ? (
          <div className="error">
            {errors[name]}
          </div>
        ) : null}

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

