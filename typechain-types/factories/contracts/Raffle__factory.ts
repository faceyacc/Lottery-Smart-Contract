/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Raffle, RaffleInterface } from "../../contracts/Raffle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "vrfCoordinatorV2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "gasLane",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "subscriptionID",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle_NotOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__NotEnoughETHEntered",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numPlayers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raffleState",
        type: "uint256",
      },
    ],
    name: "Raffle__UpkeepNotNeeded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "RaffleEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedRaffleWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "WinnerPicked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntranceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumWords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRaffleState",
    outputs: [
      {
        internalType: "enum Raffle.RaffleState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestConfirmations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x6101606040523480156200001257600080fd5b506040516200188e3803806200188e833981810160405281019062000038919062000294565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050508460a081815250508573ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff16815250508360e081815250508267ffffffffffffffff166101008167ffffffffffffffff16815250508163ffffffff166101208163ffffffff16815250506000600160146101000a81548160ff021916908360018111156200010d576200010c62000330565b5b0217905550426002819055508061014081815250505050505050506200035f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001608262000133565b9050919050565b620001728162000153565b81146200017e57600080fd5b50565b600081519050620001928162000167565b92915050565b6000819050919050565b620001ad8162000198565b8114620001b957600080fd5b50565b600081519050620001cd81620001a2565b92915050565b6000819050919050565b620001e881620001d3565b8114620001f457600080fd5b50565b6000815190506200020881620001dd565b92915050565b600067ffffffffffffffff82169050919050565b6200022d816200020e565b81146200023957600080fd5b50565b6000815190506200024d8162000222565b92915050565b600063ffffffff82169050919050565b6200026e8162000253565b81146200027a57600080fd5b50565b6000815190506200028e8162000263565b92915050565b60008060008060008060c08789031215620002b457620002b36200012e565b5b6000620002c489828a0162000181565b9650506020620002d789828a01620001bc565b9550506040620002ea89828a01620001f7565b9450506060620002fd89828a016200023c565b93505060806200031089828a016200027d565b92505060a06200032389828a01620001bc565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160a05160c05160e0516101005161012051610140516114bf620003cf600039600081816107e901526108920152600061069b01526000610678015260006106570152600061061b0152600081816102fa01526103f7015260008181610337015261038b01526114bf6000f3fe6080604052600436106100c25760003560e01c806353a2c19a1161007f57806391ad27b41161005957806391ad27b414610238578063b0fb162f14610263578063c1c244e81461028e578063e55ae4e8146102b9576100c2565b806353a2c19a146101a4578063565429de146101cf5780636e04ff0d146101fa576100c2565b806309bc33a7146100c7578063115cbaf5146100f25780631fe543e31461011d5780632cfcc539146101465780634585e33b14610150578063473f1ddc14610179575b600080fd5b3480156100d357600080fd5b506100dc6102f6565b6040516100e99190610c05565b60405180910390f35b3480156100fe57600080fd5b5061010761031e565b6040516101149190610c97565b60405180910390f35b34801561012957600080fd5b50610144600480360381019061013f9190610e4b565b610335565b005b61014e6103f5565b005b34801561015c57600080fd5b5061017760048036038101906101729190610f02565b610564565b005b34801561018557600080fd5b5061018e610763565b60405161019b9190610f90565b60405180910390f35b3480156101b057600080fd5b506101b961078d565b6040516101c69190610c05565b60405180910390f35b3480156101db57600080fd5b506101e461079a565b6040516101f19190610c05565b60405180910390f35b34801561020657600080fd5b50610221600480360381019061021c9190611060565b6107a6565b60405161022f92919061114c565b60405180910390f35b34801561024457600080fd5b5061024d61088e565b60405161025a9190610c05565b60405180910390f35b34801561026f57600080fd5b506102786108b6565b6040516102859190610c05565b60405180910390f35b34801561029a57600080fd5b506102a36108c3565b6040516102b09190610c05565b60405180910390f35b3480156102c557600080fd5b506102e060048036038101906102db919061117c565b6108cd565b6040516102ed9190610f90565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600160149054906101000a900460ff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e757337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f40000000000000000000000000000000000000000000000000000000081526004016103de9291906111a9565b60405180910390fd5b6103f18282610914565b5050565b7f000000000000000000000000000000000000000000000000000000000000000034101561044f576040517fbd4e069500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600181111561046357610462610c20565b5b600160149054906101000a900460ff16600181111561048557610484610c20565b5b146104bc576040517fd6e19a8d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f0805e1d667bddb8a95f0f09880cf94f403fb596ce79928d9f29b74203ba284d460405160405180910390a2565b600061057e604051806020016040528060008152506107a6565b509050806105ed5747600080549050600160149054906101000a900460ff1660018111156105af576105ae610c20565b5b6040517f584327aa0000000000000000000000000000000000000000000000000000000081526004016105e4939291906111d2565b60405180910390fd5b60018060146101000a81548160ff0219169083600181111561061257610611610c20565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060016040518663ffffffff1660e01b81526004016106dc9594939291906112bc565b602060405180830381600087803b1580156106f657600080fd5b505af115801561070a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072e9190611324565b9050807fcd6e45c8998311cab7e9d4385596cac867e20a0587194b954fa3a731c93ce78b60405160405180910390a250505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600161ffff16905090565b60008080549050905090565b600060606000600160149054906101000a900460ff1660018111156107ce576107cd610c20565b5b600060018111156107e2576107e1610c20565b5b14905060007f0000000000000000000000000000000000000000000000000000000000000000600254426108169190611380565b119050600080600080549050119050600080471190508280156108365750835b801561083f5750805b80156108485750815b9550856040518060400160405280600381526020017f30783000000000000000000000000000000000000000000000000000000000008152509550955050505050915091565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600361ffff16905090565b6000600254905090565b60008082815481106108e2576108e16113b4565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600080805490508260008151811061092f5761092e6113b4565b5b60200260200101516109419190611412565b90506000808281548110610958576109576113b4565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff021916908360018111156109ec576109eb610c20565b5b0217905550600067ffffffffffffffff811115610a0c57610a0b610d08565b5b604051908082528060200260200182016040528015610a3a5781602001602082028036833780820191505090505b5060009080519060200190610a50929190610b45565b504260028190555060008173ffffffffffffffffffffffffffffffffffffffff1647604051610a7e90611474565b60006040518083038185875af1925050503d8060008114610abb576040519150601f19603f3d011682016040523d82523d6000602084013e610ac0565b606091505b5050905080610afb576040517fa1d04b3900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f5b690ec4a06fe979403046eaeea5b3ce38524683c3001f662c8b5a829632f7df60405160405180910390a25050505050565b828054828255906000526020600020908101928215610bbe579160200282015b82811115610bbd5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610b65565b5b509050610bcb9190610bcf565b5090565b5b80821115610be8576000816000905550600101610bd0565b5090565b6000819050919050565b610bff81610bec565b82525050565b6000602082019050610c1a6000830184610bf6565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610c6057610c5f610c20565b5b50565b6000819050610c7182610c4f565b919050565b6000610c8182610c63565b9050919050565b610c9181610c76565b82525050565b6000602082019050610cac6000830184610c88565b92915050565b6000604051905090565b600080fd5b600080fd5b610ccf81610bec565b8114610cda57600080fd5b50565b600081359050610cec81610cc6565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d4082610cf7565b810181811067ffffffffffffffff82111715610d5f57610d5e610d08565b5b80604052505050565b6000610d72610cb2565b9050610d7e8282610d37565b919050565b600067ffffffffffffffff821115610d9e57610d9d610d08565b5b602082029050602081019050919050565b600080fd5b6000610dc7610dc284610d83565b610d68565b90508083825260208201905060208402830185811115610dea57610de9610daf565b5b835b81811015610e135780610dff8882610cdd565b845260208401935050602081019050610dec565b5050509392505050565b600082601f830112610e3257610e31610cf2565b5b8135610e42848260208601610db4565b91505092915050565b60008060408385031215610e6257610e61610cbc565b5b6000610e7085828601610cdd565b925050602083013567ffffffffffffffff811115610e9157610e90610cc1565b5b610e9d85828601610e1d565b9150509250929050565b600080fd5b60008083601f840112610ec257610ec1610cf2565b5b8235905067ffffffffffffffff811115610edf57610ede610ea7565b5b602083019150836001820283011115610efb57610efa610daf565b5b9250929050565b60008060208385031215610f1957610f18610cbc565b5b600083013567ffffffffffffffff811115610f3757610f36610cc1565b5b610f4385828601610eac565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f7a82610f4f565b9050919050565b610f8a81610f6f565b82525050565b6000602082019050610fa56000830184610f81565b92915050565b600080fd5b600067ffffffffffffffff821115610fcb57610fca610d08565b5b610fd482610cf7565b9050602081019050919050565b82818337600083830152505050565b6000611003610ffe84610fb0565b610d68565b90508281526020810184848401111561101f5761101e610fab565b5b61102a848285610fe1565b509392505050565b600082601f83011261104757611046610cf2565b5b8135611057848260208601610ff0565b91505092915050565b60006020828403121561107657611075610cbc565b5b600082013567ffffffffffffffff81111561109457611093610cc1565b5b6110a084828501611032565b91505092915050565b60008115159050919050565b6110be816110a9565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156110fe5780820151818401526020810190506110e3565b8381111561110d576000848401525b50505050565b600061111e826110c4565b61112881856110cf565b93506111388185602086016110e0565b61114181610cf7565b840191505092915050565b600060408201905061116160008301856110b5565b81810360208301526111738184611113565b90509392505050565b60006020828403121561119257611191610cbc565b5b60006111a084828501610cdd565b91505092915050565b60006040820190506111be6000830185610f81565b6111cb6020830184610f81565b9392505050565b60006060820190506111e76000830186610bf6565b6111f46020830185610bf6565b6112016040830184610bf6565b949350505050565b6000819050919050565b61121c81611209565b82525050565b600067ffffffffffffffff82169050919050565b61123f81611222565b82525050565b600061ffff82169050919050565b61125c81611245565b82525050565b600063ffffffff82169050919050565b61127b81611262565b82525050565b6000819050919050565b60006112a66112a161129c84611245565b611281565b611262565b9050919050565b6112b68161128b565b82525050565b600060a0820190506112d16000830188611213565b6112de6020830187611236565b6112eb6040830186611253565b6112f86060830185611272565b61130560808301846112ad565b9695505050505050565b60008151905061131e81610cc6565b92915050565b60006020828403121561133a57611339610cbc565b5b60006113488482850161130f565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061138b82610bec565b915061139683610bec565b9250828210156113a9576113a8611351565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061141d82610bec565b915061142883610bec565b925082611438576114376113e3565b5b828206905092915050565b600081905092915050565b50565b600061145e600083611443565b91506114698261144e565b600082019050919050565b600061147f82611451565b915081905091905056fea26469706673582212207f6d469ac60ff5b2d69b52d171b8a2b1ad8f98f8f63f2bd99f3d7dfce90c52e564736f6c63430008090033";

type RaffleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RaffleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Raffle__factory extends ContractFactory {
  constructor(...args: RaffleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    vrfCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    subscriptionID: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Raffle> {
    return super.deploy(
      vrfCoordinatorV2,
      entranceFee,
      gasLane,
      subscriptionID,
      callbackGasLimit,
      interval,
      overrides || {}
    ) as Promise<Raffle>;
  }
  override getDeployTransaction(
    vrfCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    gasLane: PromiseOrValue<BytesLike>,
    subscriptionID: PromiseOrValue<BigNumberish>,
    callbackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      vrfCoordinatorV2,
      entranceFee,
      gasLane,
      subscriptionID,
      callbackGasLimit,
      interval,
      overrides || {}
    );
  }
  override attach(address: string): Raffle {
    return super.attach(address) as Raffle;
  }
  override connect(signer: Signer): Raffle__factory {
    return super.connect(signer) as Raffle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RaffleInterface {
    return new utils.Interface(_abi) as RaffleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Raffle {
    return new Contract(address, _abi, signerOrProvider) as Raffle;
  }
}