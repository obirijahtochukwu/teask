import React from "react";
import { Row, Col } from "react-bootstrap";

export default function SectionTitle({
  title,
  des,
}: {
  title?: string;
  des?: string;
}) {
  return (
    <Row className="justify-content-center text-center">
      <Col>
        <div className="section__title">
          <h2> {title} </h2>
          <p> {des} </p>
        </div>
      </Col>
    </Row>
  );
}
