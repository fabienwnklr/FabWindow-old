import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FabModal } from '../../../../lib/FabModal';

export default function Basic() {
  const showModal = () => {
    new FabModal();
  };

  return (
    <>
      <div
        style={{
          marginBottom: '1rem'
        }}
      >
        <h4>The most vanilla of examples.</h4>
        <p>By default Window opened with a loader</p>
        <button
          id='basic'
          className='px-3 py-1 font-semibold text-white transition-colors duration-300 transform bg-black rounded-md hover:bg-gray-700 hover:no-underline'
          onClick={showModal}
        >
          Click to show most simple Window
        </button>
      </div>

      <CodeBlock className='language-html' title='Html'>
        {`<button id="basic" onclick="new FabModal()">Click to show most simple Window</button>`}
      </CodeBlock>

      <CodeBlock className='language-javascript' title='Javascript'>
        // No JS needed here...
      </CodeBlock>
    </>
  );
}
