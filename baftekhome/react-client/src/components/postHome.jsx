import React from "react";
import axios from "axios";
import $ from "jquery";

class PostHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: ""
    };
  }

  postHomes(description, location, category, contactInformation, price) {
    let config = {
      headers: {
        Authorization: "Client-ID 884e577759efe90"
      }
    };
    const fd = new FormData();
    fd.append("image", this.state.image);
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload`,
        fd,
        config
      )
      .then((res) => {
        var firstName = this.props.user[0].firstName;
        var lastName = this.props.user[0].lastName;
        var obj = {
          firstName: firstName,
          lastName: lastName,
          image: res.data.data.link,
          description: description,
          location: location,
          category: category,
          contactInformation: contactInformation,
          price: price
        };
        axios.post("/api/homes", obj).then(() => {
          this.props.fetchHomes();
          this.props.changeView("home")
        });
      });
  }

  getImage(event) {
    this.setState({ image: event.target.files[0] });
  }
  render() {
    return (
      <div>
        <label>Description:</label>
        <br></br>
        <input placeholder="description" id="description" />
        <br></br>
        <label>Location:</label>
        <br></br>
        <input placeholder="location" id="location" />
        <br></br>
        <label>Category:</label>
        <br></br>
        <input placeholder="category" id="category" />
        <br></br>
        <label>Contact Information:</label>
        <br></br>
        <input placeholder="contactInformation" id="contactInformation" />
        <br></br>
        <label>Price:</label>
        <br></br>
        <input placeholder="price" id="price" />
        <br></br>
        <label>Insert Image:</label>
        <br></br>
        <input
          placeholder="image"
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          onChange={this.getImage.bind(this)}
        />
        <br></br>
        <button
          onClick={() => {
            this.postHomes(
              $("#description").val(),
              $("#location").val(),
              $("#category").val(),
              $("#contactInformation").val(),
              $("#price").val()
            );
          }}>
          submit
        </button>
      </div>
    );
  }
}
export default PostHome;
