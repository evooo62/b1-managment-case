import React, { useEffect,useState } from "react";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./survey.css";
import {BsCardChecklist} from 'react-icons/bs'

function Survey() {
  const [data, setData] = useState([]);
  const [userInformation, setUserInformation] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();

  let note = [];
  let survey_answers = []; // api gidecek olan payload
  useEffect(() => {
    console.log(setModalShow);
    let token = localStorage.getItem("access_token");
    console.log("token", token);

    if (token != null && token != undefined) {
      fetch("https://icibot.net/v2/api/main_survey/24", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data", data);
          setData(data);
        });
    }
    if (token != null && token != undefined) {
      fetch("https://icibot.net/v2/api/app_me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("UserInformation", data);
          setUserInformation(data);
        });
    }
  }, []);

  const handleClose = () => {
    setModalShow(false);
    navigate("/guestdetails");
  };
  const AllPost = () => {
    note = document.getElementById("text1").value;

    survey_answers.map((item) => {
      delete item.id;
    });
    let allData = {
      survey_answers,
      note,
    };
    console.log("GİDENDATA", JSON.stringify(allData));

    let token = localStorage.getItem("access_token");

    if (token != null && token != undefined) {
      fetch("https://icibot.net/v2/api/survey_answer", {
        method: "POST",
        body: JSON.stringify(allData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=utf-8",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("GELENVERİ", data);
          setResponseData(data);
        });
    }

    setModalShow(true);
  };

  const inputChange = (item, value) => {
    delete item.updated_at;
    delete item.created_at;
    item.survey_line_id = item.id;
    item.profile_id = userInformation.id;

    console.log("item", item);
    console.log("value", value);

    // const data2 = data?.survey_lines.find(x => x.id == item.id);

    if (item.question_type == "boolean") {
      item.answer = value == "true" ? "Evet" : "Hayır";
      item.answer_numeric = value == "true" ? 10 : 1;

      let exists = survey_answers.find((x) => x.id == item.id);

      if (exists == null) {
        survey_answers = [item, ...survey_answers]; // aynı id yoksa diziye ekle
      } else {
        exists = { ...item }; // aynı id varsa güncelle objeyi
      }
    } else if (item.question_type == "nps") {
      item.answer = value.toString();
      item.answer_numeric = value;
      item.survey_line_id = item.id;

      let exists = survey_answers.find((x) => x.id == item.id);

      if (exists == null) {
        survey_answers = [item, ...survey_answers]; // aynı id yoksa diziye ekle
      } else {
        exists = { ...item }; // aynı id varsa güncelle objeyi
      }
    } else if (item.question_type == "smile") {
      if (value == 10) {
        item.answer = "Çok Memnunum";
      }
      if (value == 8) {
        item.answer = "Memnunum";
      }
      if (value == 6) {
        item.answer = "Vasat";
      }
      if (value == 4) {
        item.answer = "Memnun Değilim";
      }
      if (value == 2) {
        item.answer = "Hiç Memnun Değilim";
      }

      item.answer_numeric = value;
      item.survey_line_id = item.id;

      let exists = survey_answers.find((x) => x.id == item.id);

      if (exists == null) {
        survey_answers = [item, ...survey_answers]; // aynı id yoksa diziye ekle
      } else {
        exists = { ...item }; // aynı id varsa güncelle objeyi
      }
    }

    // setSurvey(survey_answers);
    console.log("survey_answers", survey_answers);

    // console.log('data?.survey_lines',)
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Hotel Survey</h1>
      <ListGroup className="listgroupdetail">
        {data?.survey_lines?.map((item) => {
          return (
            <ListGroup.Item key={item.id}>
              
              <p><BsCardChecklist/> {item.question}</p>

              {item.question_type == "boolean" && (
                <>
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, "true")}
                  />{" "}
                  Evet{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, "false")}
                  />{" "}
                  Hayır
                </>
              )}
              {item.question_type == "nps" && (
                <>
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 1)}
                  />{" "}
                  1{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 2)}
                  />{" "}
                  2{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 3)}
                  />{" "}
                  3{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 4)}
                  />{" "}
                  4{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 5)}
                  />{" "}
                  5{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 6)}
                  />{" "}
                  6{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 7)}
                  />{" "}
                  7{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 8)}
                  />{" "}
                  8{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 9)}
                  />{" "}
                  9{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 10)}
                  />{" "}
                  10{" "}
                </>
              )}
              {item.question_type == "smile" && (
                <>
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 2)}
                  />{" "}
                  Çok Memnunum{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 4)}
                  />{" "}
                  Memnunum{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 6)}
                  />{" "}
                  Vasat{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 8)}
                  />{" "}
                  Memnun Değilim{" "}
                  <input
                    type="radio"
                    name={`YesNo_${item.id}`}
                    onChange={() => inputChange(item, 10)}
                  />{" "}
                  Hiç Memnun Değilim{" "}
                </>
              )}
            </ListGroup.Item>
          );
        })}
        <br/>
        <InputGroup className="mt-2">
        
        <FormControl as="textarea" id="text1" aria-label="With textarea" placeholder="Note Place" className="p-3"/>
      </InputGroup>
      </ListGroup>
      <br/>
      <Button onClick={AllPost} className="btn-lg float-end">
        Send
      </Button>
      <br/>
      {/* </Form> */}
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{responseData?.hotel_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseData?.survey_result >= 7 ? (
            <>
              <p>
                {
                  responseData?.survey_header
                    .thanks_message_for_positive_reviews
                }
              </p>
              <a href="https://www.tripadvisor.com.tr/UserReviewEdit-g297983-d19446489-Cappadocia_Hot_Air_Balloon_Flight-Goreme_Cappadocia.html">
                {responseData?.survey_header.positive_redirect_urls}
              </a>{" "}
            </>
          ) : (
            <p>
              {responseData?.survey_header.thanks_message_for_negative_reviews}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Survey;
