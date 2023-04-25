import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount} from "wagmi";
import { ncontract } from "./App";
import './mint.css';

const Mint = ( ) => {
  const { address } = useAccount();
  // console.log("addressssssssss",address)
  
  const handlesetUri=async()=>
  {
    const uriInput=document.getElementById('seturiId').value;
    try
    {
      const setURIFunc=await ncontract.setBaseTokenURI(uriInput);
      await setURIFunc.wait();
      console.log('BaseUri Setted');
      alert("BaseUri Setted");
    }
    catch
    {
      console.log("Can't set Base URI");
      alert("Can't set Base URI");
    }
  }

  const handleShow=async()=>
  {
      const showUri=await ncontract.baseTokenURI();
      console.log("BaseUri",showUri);
      document.getElementById('uriid').innerHTML=showUri;
      alert("BaseUri= "+showUri);
  }

  const handleMint=async()=>
  {
    const add=document.getElementById('addr').value;
    try
    {
      const mintfunc=await ncontract.mintTo(add);
      const e=await mintfunc.wait();
      console.log('Minted ');
      // console.log("token id",e.events[0].args.tokenId);
      const tokenId=Number(e.events[0].args.tokenId);
      console.log("tokemnnnnnnn",tokenId);
      alert("Token Minted\nToken Id: "+tokenId)
    }
    catch
    {
      console.log('gtj');
    }
  }

  return (
    <>
      {/* <div>

          <h3>Set Base uri</h3>
          <input type="text" id="seturiId" placeholder='Enter Address' /><br />
          <button  className='btn btn-primary' onClick={handlesetUri} style={{width:'100px',marginBlock:'20px'}}>set</button> 

          <br /><br />
          <h3>Show Setted baseURI</h3>
        
          <button className='btn btn-primary' onClick={handleShow} style={{width:'150px'}}>Show baseUri</button>
          <br /><br />
          <h3>Mint NFT</h3>
          <input type="text" id='addr' placeholder='Enter Address' value={address}/><br />
          <div style={{display:'flex',justifyContent:'center',marginBlock:'20px'}}>
          <ConnectButton />
          </div>
          
          <button className='btn btn-primary' onClick={handleMint} style={{width:'100px'}}>Mint</button>
        
          
      </div> */}

      <div class="accordion" id="accordionExample">
      <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
              CONNECT WALLET
            </button>
          </h2>
            <div id="collapseOne1" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="card">
                  <div class="card-body">
                    
                  <div style={{display:'flex',justifyContent:'center',marginBlock:'20px'}}>
                  <ConnectButton />
                  </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              SET BASETOKENURI
            </button>
          </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="card">
                  <div class="card-body">
                    
                    <input type="text" id="seturiId" placeholder='Enter URL' /><br />
                    <button  className='btn btn-primary' onClick={handlesetUri} >set</button> 
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              SHOW BASETOKENURI
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
            <div class="card" >
              <div class="card-body">
                <div id="uriid"></div>
                <button className='btn btn-primary my-3' onClick={handleShow} >Show baseUri</button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              MINT NFT
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="card" >
                <div class="card-body">
                  <input type="text" id='addr' placeholder='Enter Address' value={address}/><br />
                  {/* <div style={{display:'flex',justifyContent:'center',marginBlock:'20px'}}>
                  <ConnectButton />
                  </div> */}
                  <button className='btn btn-primary' onClick={handleMint}>Mint</button>
                </div>
              </div>     
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mint