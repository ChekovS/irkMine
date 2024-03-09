import React, { useState, useEffect } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import http from '../../http-common';
class ToolTipContent extends React.Component {
    state = {
        brand: [],
        director: {},
        CurrentUser:JSON.parse(localStorage.getItem('currentUser')),
        brandId:this.props.brandId,
      };
    
      // обработчик, который срабатывает до вызова render() (во Vue аналог — mounted())
      async componentWillMount() {
        try {
          const brand = await http.get(`/brand/${this.state.brandId}`);
          this.setState({ brand: brand.data });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    render() {
        const brand = this.state.brand;
        return (
            <Tooltip id="button-tooltip" {...this.props}>
              <div style={{textAlign:'left', color:'white'}}>
                {brand.description}
                </div>

            </Tooltip>
        );
    }
}
export default ToolTipContent;