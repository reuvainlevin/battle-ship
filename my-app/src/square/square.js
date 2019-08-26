import React from 'react';
import './square.css';
import boom from '../images/boom.JPG';
import water from '../images/water.JPG';
import a12 from '../images/12a.jpg';
import a22 from '../images/22a.jpg';
import d12 from '../images/12d.jpg';
import d22 from '../images/22d.jpg';
import a13 from '../images/13a.jpg';
import a23 from '../images/23a.jpg';
import a33 from '../images/33a.jpg';
import d13 from '../images/13d.jpg';
import d23 from '../images/23d.jpg';
import d33 from '../images/33d.jpg';
import a14 from '../images/14a.jpg';
import a24 from '../images/24a.jpg';
import a34 from '../images/34a.jpg';
import a44 from '../images/44a.jpg';
import d14 from '../images/14d.jpg';
import d24 from '../images/24d.jpg';
import d34 from '../images/34d.jpg';
import d44 from '../images/44d.jpg';
import a15 from '../images/15a.jpg';
import a25 from '../images/25a.jpg';
import a35 from '../images/35a.jpg';
import a45 from '../images/45a.jpg';
import a55 from '../images/55a.jpg';
import d15 from '../images/15d.jpg';
import d25 from '../images/25d.jpg';
import d35 from '../images/35d.jpg';
import d45 from '../images/45d.jpg';
import d55 from '../images/55d.jpg';
export class Square extends React.Component {
    render() {

        if (this.props.value) {

            switch (this.props.value.hit) {
                case "HIT":
                    switch (this.props.value.image) {
                        case "a12":
                            this.css = { backgroundImage: 'url(' + a12 + ')' };
                            break;
                        case "a22":
                            this.css = { backgroundImage: 'url(' + a22 + ')' };
                            break;
                        case "d12":
                            this.css = { backgroundImage: 'url(' + d12 + ')' };
                            break;
                        case "d22":
                            this.css = { backgroundImage: 'url(' + d22 + ')' };
                            break;
                        case "a13":
                            this.css = { backgroundImage: 'url(' + a13 + ')' };
                            break;
                        case "a23":
                            this.css = { backgroundImage: 'url(' + a23 + ')' };
                            break;
                        case "a33":
                            this.css = { backgroundImage: 'url(' + a33 + ')' };
                            break;
                        case "d13":
                            this.css = { backgroundImage: 'url(' + d13 + ')' };
                            break;
                        case "d23":
                            this.css = { backgroundImage: 'url(' + d23 + ')' };
                            break;
                        case "d33":
                            this.css = { backgroundImage: 'url(' + d33 + ')' };
                            break;
                        case "a14":
                            this.css = { backgroundImage: 'url(' + a14 + ')' };
                            break;
                        case "a24":
                            this.css = { backgroundImage: 'url(' + a24 + ')' };
                            break;
                        case "a34":
                            this.css = { backgroundImage: 'url(' + a34 + ')' };
                            break;
                        case "a44":
                            this.css = { backgroundImage: 'url(' + a44 + ')' };
                            break;
                        case "d14":
                            this.css = { backgroundImage: 'url(' + d14 + ')' };
                            break;
                        case "d24":
                            this.css = { backgroundImage: 'url(' + d24 + ')' };
                            break;
                        case "d34":
                            this.css = { backgroundImage: 'url(' + d34 + ')' };
                            break;
                        case "d44":
                            this.css = { backgroundImage: 'url(' + d44 + ')' };
                            break;
                        case "a15":
                            this.css = { backgroundImage: 'url(' + a15 + ')' };
                            break;
                        case "a25":
                            this.css = { backgroundImage: 'url(' + a25 + ')' };
                            break;
                        case "a35":
                            this.css = { backgroundImage: 'url(' + a35 + ')' };
                            break;
                        case "a45":
                            this.css = { backgroundImage: 'url(' + a45 + ')' };
                            break;
                        case "a55":
                            this.css = { backgroundImage: 'url(' + a55 + ')' };
                            break;
                        case "d15":
                            this.css = { backgroundImage: 'url(' + d15 + ')' };
                            break;
                        case "d25":
                            this.css = { backgroundImage: 'url(' + d25 + ')' };
                            break;
                        case "d35":
                            this.css = { backgroundImage: 'url(' + d35 + ')' };
                            break;
                        case "d45":
                            this.css = { backgroundImage: 'url(' + d45 + ')' };
                            break;
                        case "d55":
                            this.css = { backgroundImage: 'url(' + d55 + ')' };
                            break;
                    }
                    break;
                case "Miss..":
                    this.css = { backgroundImage: 'url(' + water + ')' };
                    break;
                case "BOOM":
                    this.css = { backgroundImage: 'url(' + boom + ')' };
            }

        } else {
            this.css = { backgroundImage: 'none' };
        }

        //this.backgroundImage = this.props.value ? this.props.value : "none";

        return (
            <div key={this.props.id} className="square" onClick={this.props.onClick} style={this.css}>

            </div>
        );
    }
}