import React from 'react';

export const LevelTwoInstructions = () => <>1. In KYC Level 2, select specific Era Swap Ecosystem Platform by
  clicking on the platform logo, you need to do Level 2 KYC for. Fill up
  platform specific details required and click on ‘Submit’. Then click
  on ‘Next’ to go to Level 3.
  <br></br>
  2. You can also skip Level 2 for now by clicking on ‘Next’ Button but
  please remember that you have to complete Level 2 KYC to be eligible to
  use Era Swap Platforms as Verified User in future.</>;

export const LevelThreeInstructions = () => <>
1. In KYC Level 2, select specific Era Swap Ecosystem Platform by clicking on the platform logo, you need to do Level 2 KYC for. Fill up platform specific     details required and click on ‘Submit’.<br></br>
2. If a Era Swap Ecosystem member wants to move to Level 3, then click on ‘Next’ to go to Level 3.<br></br>
3. The charges for Level 3 KYC will be applicable from 21st of August 2020 onwards. <br></br>
4. Upload the relevant Documents / Images / Short Videos and click on 'Submit' Button<br></br>
</>

export const LevelFourInstructions = () => <>
1. In KYC Level 4, a member can apply for FOS Tagya Validation by giving required charges.<br></br>

2. A member can become FOS Tagya for physical verification of KYC on Era Swap Ecosystem. <br></br>

3. The charges for Level 4 KYC will be applicable from 21st of August 2020 onwards. <br></br>

4. Select the Options and click on 'Submit' Button<br></br>
</>

export const LevelFiveInstructions = () => <>
1. In KYC Level 5, a member can apply for Curator Validation by giving required charges. <br></br>
2.  A member can become Curator for KYC verification in Era Swap Ecosystem. <br></br>
3.  The charges for Level 5 KYC will be applicable from 21st of August 2020 onwards.<br></br>
4.  Fill the details and click on 'Submit' Button.<br></br>
</>

export const renderInstruction = (level) => {
  let Instruction = LevelTwoInstructions;
  switch (level) {
    case 2:
      Instruction = LevelTwoInstructions;
      break;
    case 3:
      Instruction = LevelThreeInstructions;
      break;
    case 4:
      Instruction = LevelFourInstructions;
      break;
    case 5:
      Instruction = LevelFiveInstructions;
      break;
    default:
      break;
  }
  return <Instruction />;
}