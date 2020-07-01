import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import { waitForDomChange } from '@testing-library/react';

class RenderList extends Component{
    render() {
        return (
                <div className="col-sm-6">
                    <Card>
                        <CardBody>
                            <CardTitle>Food Search Results</CardTitle>
                            <CardText>
                            </CardText>
                        </CardBody> 
                    </Card>
                </div>
        );
    }
}

export default RenderList;