import React, { Component } from 'react';
import styled from 'styled-components';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
`;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vh: 0,
      slideNumber: 0,
    };
    this.pageSplitTimes = 1.4;
    this.lastScrollTop = 0;
    this.scrollDirectionDown = true;
    this.handleScroll = this.handleScroll.bind(this);
    this.workDetails = [
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
      {
        number: '01',
        projectName: 'CampusClicks',
        projectDesc: "A stunning MERNstack project that flawlessly replicates Instagram's essence, providing an immersive social media experience for users while showcasing seamless functionality",
        projectType: 'MERN Stack Project',
        roles: ['Full-stack developer'],
      },
      {
        number: '02',
        projectName: 'ShopFusion',
        projectDesc: "ShopFusion is your ultimate destination for a seamless shopping experience, offering a diverse range of products and a fusion of trends that cater to every shopper's style and needs.",
        projectType: 'Web APP',
        roles: ['FrontEnd Design'],
      },
      {
        number: '03',
        projectName: 'Restrunt app',
        projectDesc: 'Food ordering site, with add to favorite list options store data in local storage',
        projectType: 'Web APP',
        roles: ['UI Designer'],
      },
      {
        number: '04',
        projectName: 'NotesMaker',
        projectDesc: 'Notemaking application that saves your notes ,automatic management edit ,delete ,read mode options',
        projectType: 'Web APP',
        roles: ['UI Designer', 'Front-end Developer'],
      },
      {
        number: '05',
        projectName: 'Foodies',
        projectDesc: 'Attractive food ordering website features a clean, user-friendly design with vibrant food imagery, intuitive navigation, and straightforward ordering options, creating an enticing and easy-to-use platform for customers to explore diverse menus and place their orders seamlessly.',
        projectType: 'WEB APP',
        roles: ['UI Designer', 'Front-end Developer'],
      },
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
    ];
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState(
      {
        vh: Math.round(
          window.document.documentElement.clientHeight * this.pageSplitTimes,
        ),
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { body, documentElement } = event.srcElement;
    const { vh, slideNumber } = this.state;
    const scrollDistance = Math.max(body.scrollTop, documentElement.scrollTop);
    if (scrollDistance > this.lastScrollTop) {
      this.scrollDirectionDown = true;
    } else {
      this.scrollDirectionDown = false;
    }
    this.lastScrollTop = scrollDistance;
    // console.log(scrollDistance);

    if (Math.floor(scrollDistance / vh) !== slideNumber
      && slideNumber < this.workDetails.length - 1) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    } else if (slideNumber === this.workDetails.length - 1
      && (Math.floor(scrollDistance / vh) < slideNumber)) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    }
  }

  changeTextContentBasedOnScroll() {
    const { slideNumber } = this.state;
    const refresh = true;
    return (
      <TextContent
        number={this.workDetails[slideNumber].number}
        projectName={this.workDetails[slideNumber].projectName}
        projectDesc={this.workDetails[slideNumber].projectDesc}
        projectType={this.workDetails[slideNumber].projectType}
        roles={this.workDetails[slideNumber].roles}
        refreshToggle={refresh}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.changeTextContentBasedOnScroll()}
        <ImageContent pageSplitTimes={this.pageSplitTimes} />
      </Container>
    );
  }
}

export default Work;
