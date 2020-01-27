import React from 'react';
import './Landing.css'

export default class Landing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <main role="main">
                    <header role="banner">
                        <h1>Hero</h1>
                    </header>

                    <section>Section 1</section>

                    <section>Section 2</section>

                    <section>Section 3</section>

                    <section>Project 3</section>
                    
                    <section>Section 4</section>
                </main>
            </React.Fragment>
        );
    }
}
