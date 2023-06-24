import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment.svg'
import pen from '../../assets/pen.svg'
import blackLogo from '../../assets/blackLogo.svg'
const Widget = () => {

    return (
        <div className='widget'>
            <h4>The Overflow Blog</h4>
            <div className='right-sidebar-div-1'>
                <div className='right-sidebar-div-2'>
                    <img src={pen} alt='pen' width='18' />
                    <p>The nature of simulating nature: Q&A with IBM quantum computing research</p>
                </div>
                <div className='right-sidebar-div-2'>
                    <img src={pen} alt='pen' width='18' />
                    <p>The AI that writes music from text (Ep. 535)</p>
                </div>
            </div>
            <h4>Featured on Meta</h4>
            <div className='right-sidebar-div-1'>
                <div className='right-sidebar-div-2'>
                    <img src={comment} alt='comment' width='18' />
                    <p>Accessibility Update: Colors</p>
                </div>
                <div className='right-sidebar-div-2'>
                    <img src={blackLogo} alt='blackLogo' width='18' />
                    <p>2022: a year in moderation</p>
                </div>
                
                <div className='right-sidebar-div-2'>
                    <img src={blackLogo} alt='blackLogo' width='18' />
                    <p>Collectives: The next iteration</p>
                </div>
            </div>
        </div>
    )

}
export default Widget