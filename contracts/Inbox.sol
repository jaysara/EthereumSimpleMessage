pragma solidity ^0.4.19;

contract Inbox{
    string public message;

    function Inbox(string inboxmessage) public{
        message = inboxmessage;
    }

    function setMessage(string newmessage) public{
        message = newmessage;
    }



}
