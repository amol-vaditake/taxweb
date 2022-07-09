import React from "react";
import "./ask.scss";
function Ask() {
  return (
    <React.Fragment>
      <div className="askComp">
        {/* <input type="name" placeholder="ask what you want?"/> */}

        <div
          style={{ width: "400px", marginLeft: "auto", marginRight: "auto" }}
          className="input-field col s12"
        >
          <input id="name" type="text" />
          <label htmlFor="name">Ask what you want ?</label>
          {/* <button style={{}}>Add Question</button> */}
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginLeft: "auto",
                background:"#b92b27",
                marginRight: "auto",
              }}
              type="submit"
              className="btn btn-small waves-effect waves-light hoverable  accent-3"
            >
              Add Question
            </button>
          </div>
          <div
            style={{
              display: "flex",
              width: "400px",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <img style={{ height: "20px" }} src="mes.png" />
            <img style={{ height: "30px" }} src="edit.png" />
            <img style={{ height: "30px" }} src="cm.png" />
          </div>
        </div>

        {/* <h3> Ask</h3> */}
      </div>
    </React.Fragment>
  );
}

export default Ask;
