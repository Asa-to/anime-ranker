import React, { FC, useRef } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

const range = (start: number, end: number) => Array.from({ length: (end - start) + 1}, (_, i) => start + i);

const YearOptions: FC = () => {
  const minYear = 2014;
  const thisYear = new Date().getFullYear();
  
  return (
    <>
      {range(minYear, thisYear).reverse().map((year) => {
        return <option key={year} value={year} >{year}年</option>
      })}
    </>
  );
}

const SeasonOptions: FC = () => {
  return (
    <>
      {range(1, 4).map((season) => {
        return <option key={season} value={season} >{season}期</option>
      })}
    </>
  );
}

const MyForms: FC<{setYear: React.Dispatch<number>, setSeason: React.Dispatch<number>, year: number, season: number}> = ({setYear, setSeason, year, season}) => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const seasonRef = useRef<HTMLSelectElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if(yearRef.current) setYear(Number(yearRef.current.value));
    if(seasonRef.current) setSeason(Number(seasonRef.current.value));
  }

  return (
    <Form>
      <Form.Row style={{width: '300px'}} className='mx-auto my-3'>
        <Col>
          <Form.Control as='select' defaultValue={year} ref={yearRef} custom>
            <YearOptions />
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as='select' defaultValue={season} ref={seasonRef} custom>
            <SeasonOptions  />
          </Form.Control>
        </Col>
        <Col>
          <Button type='submit' onClick={handleClick}>
            更新
          </Button>
        </Col>

      </Form.Row>
    </Form>
  )
}

export default MyForms;