import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import FadeInScroll from "../components/FadeInScroll";

import line from "../assets/images/line.png";
import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import project4 from "../assets/images/project4.jpg";
import project5 from "../assets/images/project5.jpg";
import project6 from "../assets/images/project6.jpg";

const AboutScreen = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Container className="pt-4">
        <Row>
          <div className="text-center">
            <Image src={line} width="100" fluid className="my-5" />
            <h1>
              <div className="display-1">Why shop with us?</div>
              <div className="text-muted my-2">
                We're dedicated to introducing all sewists to the world of
                historical costuming.
              </div>
            </h1>
            <Image src={line} width="100" fluid className="my-5" />
          </div>
        </Row>
        <Row className="my-5">
          <Col md={4}>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-book my-4"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              <h2>Research</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ullamcorper morbi tincidunt ornare massa eget. Morbi leo urna
                molestie at elementum eu facilisis sed.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-palette my-4"
                viewBox="0 0 16 16"
              >
                <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
              </svg>
              <h2>Creativity</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ullamcorper morbi tincidunt ornare massa eget. Morbi leo urna
                molestie at elementum eu facilisis sed.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="currentColor"
                className="bi bi-bicycle my-4"
                viewBox="0 0 16 16"
              >
                <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5zm1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139L5.5 6.943zM8 9.057 9.598 6.5H6.402L8 9.057zM4.937 9.5a1.997 1.997 0 0 0-.487-.877l-.548.877h1.035zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765l1.027-1.643zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53L11.55 8.623z" />
              </svg>
              <h2>Events</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ullamcorper morbi tincidunt ornare massa eget. Morbi leo urna
                molestie at elementum eu facilisis sed.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="my-5">
          <h3>
            Check out some of our projects below!{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
              />
            </svg>
          </h3>
        </Row>
        <FadeInScroll>
          <Row>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image src={project1} fluid alt="Dress at Museum A" />
                <figcaption className="d-flex justify-content-center align-items-center">
                  Dress at Museum A.
                </figcaption>
              </figure>
            </Col>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image
                  src={project2}
                  fluid
                  alt="Gathered dress (back) at Museum A"
                />
                <figcaption className="d-flex justify-content-center align-items-center">
                  Gathered dress (back) at Museum A.
                </figcaption>
              </figure>
            </Col>
          </Row>
        </FadeInScroll>

        <FadeInScroll>
          <Row>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image src={project3} fluid alt="Polonaise at Museum B" />
                <figcaption className=" d-flex justify-content-center align-items-center">
                  Polonaise at Museum B.
                </figcaption>
              </figure>
            </Col>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image src={project4} fluid alt="Riding habit at Museum C" />
                <figcaption className=" d-flex justify-content-center align-items-center">
                  Riding habit at Museum C.
                </figcaption>
              </figure>
            </Col>
          </Row>
        </FadeInScroll>

        <FadeInScroll>
          <Row>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image src={project5} fluid alt="Tiered skirt at Museum D" />
                <figcaption className=" d-flex justify-content-center align-items-center">
                  Tiered skirt at Museum D.
                </figcaption>
              </figure>
            </Col>
            <Col md={6} className="my-3">
              <figure className="overlay-caption">
                <Image src={project6} fluid alt="Day dress at Museum D" />
                <figcaption className=" d-flex justify-content-center align-items-center">
                  Day dress at Museum D.
                </figcaption>
              </figure>
            </Col>
          </Row>
        </FadeInScroll>
      </Container>
    </>
  );
};

export default AboutScreen;
