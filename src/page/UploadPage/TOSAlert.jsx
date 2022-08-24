import React, { Component } from "react";
import Swal from "sweetalert2";

export default class TOSAlert extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            ...this.props
        });
    }

    render() {
        return (
            <div>
                <button style={{backgroundColor:"transparent", border:"transparent", textDecoration:"line", color:"white", borderRadius:"5px",padding:10}} onClick={this.HandleClick}>
                    약관 확인
                </button>
            </div>
        );
    }
}