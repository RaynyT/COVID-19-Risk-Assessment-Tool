import './InfoPage.css'
import { Collapse, Card, CardBody} from 'reactstrap'
import { ChevronDownIcon } from '@primer/octicons-react';
import { useState } from 'react';

export default function InfoPage() {

    const [isOpenA, setIsOpenA] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);
    const [isOpenC, setIsOpenC] = useState(false);


    const toggleA = () => setIsOpenA(!isOpenA);
    const toggleB = () => setIsOpenB(!isOpenB);
    const toggleC = () => setIsOpenC(!isOpenC);


    return (
        <div className="outer">
            <div className="info-main-container">
                <h1 className="info-title">Frequently Asked Questions</h1>
                <div>
                    <div>
                        <button className="btn btn-outline-secondary" onClick={toggleA}>Test A</button>
                        <Collapse isOpen={isOpenA}>
                            <Card>
                                <CardBody>
                                    Test A
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary" onClick={toggleB}>Test B</button>
                        <Collapse isOpen={isOpenB}>
                            <Card>
                                <CardBody>
                                    Test B
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                    <div>
                        <button className="btn btn-outline-secondary" onClick={toggleC}>Test C</button>
                        <Collapse isOpen={isOpenC}>
                            <Card>
                                <CardBody>
                                    Test C
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    )
}