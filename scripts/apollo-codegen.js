"use strict";

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

const graphql = require("graphql");
const visitorPluginCommon = require("@graphql-codegen/visitor-plugin-common");
const autoBind = _interopDefault(require("auto-bind"));
const pascalCase = require("pascal-case");
const camelCase = require("camel-case");
const path = require("path");

class ReactApolloVisitor extends visitorPluginCommon.ClientSideBaseVisitor {
  constructor(schema, fragments, rawConfig, documents) {
    super(schema, fragments, rawConfig, {
      componentSuffix: visitorPluginCommon.getConfigValue(
        rawConfig.componentSuffix,
        "Component",
      ),
      withHOC: visitorPluginCommon.getConfigValue(rawConfig.withHOC, true),
      withComponent: visitorPluginCommon.getConfigValue(
        rawConfig.withComponent,
        true,
      ),
      withHooks: visitorPluginCommon.getConfigValue(rawConfig.withHooks, false),
      withMutationFn: visitorPluginCommon.getConfigValue(
        rawConfig.withMutationFn,
        true,
      ),
      withRefetchFn: visitorPluginCommon.getConfigValue(
        rawConfig.withRefetchFn,
        false,
      ),
      apolloReactCommonImportFrom: visitorPluginCommon.getConfigValue(
        rawConfig.apolloReactCommonImportFrom,
        rawConfig.reactApolloVersion === 3
          ? "@apollo/client"
          : "@apollo/react-common",
      ),
      apolloReactComponentsImportFrom: visitorPluginCommon.getConfigValue(
        rawConfig.apolloReactComponentsImportFrom,
        rawConfig.reactApolloVersion === 3
          ? "@apollo/client"
          : "@apollo/react-components",
      ),
      apolloReactHocImportFrom: visitorPluginCommon.getConfigValue(
        rawConfig.apolloReactHocImportFrom,
        rawConfig.reactApolloVersion === 3
          ? "@apollo/client"
          : "@apollo/react-hoc",
      ),
      apolloReactHooksImportFrom: visitorPluginCommon.getConfigValue(
        rawConfig.apolloReactHooksImportFrom,
        rawConfig.reactApolloVersion === 3
          ? "@apollo/client"
          : "@apollo/react-hooks",
      ),
      reactApolloVersion: visitorPluginCommon.getConfigValue(
        rawConfig.reactApolloVersion,
        2,
      ),
      withResultType: visitorPluginCommon.getConfigValue(
        rawConfig.withResultType,
        true,
      ),
      withMutationOptionsType: visitorPluginCommon.getConfigValue(
        rawConfig.withMutationOptionsType,
        true,
      ),
      addDocBlocks: visitorPluginCommon.getConfigValue(
        rawConfig.addDocBlocks,
        true,
      ),
    });
    this.imports = new Set();
    this._externalImportPrefix = this.config.importOperationTypesFrom
      ? `${this.config.importOperationTypesFrom}.`
      : "";
    this._documents = documents;
    autoBind(this);
  }
  getReactImport() {
    return `import * as React from 'react';`;
  }
  getApolloReactCommonImport() {
    return ``;
  }
  getApolloReactComponentsImport() {
    return `import * as ApolloReactComponents from '${this.config.apolloReactComponentsImportFrom}';`;
  }
  getApolloReactHocImport() {
    return `import * as ApolloReactHoc from '${this.config.apolloReactHocImportFrom}';`;
  }
  getApolloReactHooksImport() {
    return `import * as ApolloReactHooks from '${this.config.apolloReactHooksImportFrom}';`;
  }
  getOmitDeclaration() {
    return visitorPluginCommon.OMIT_TYPE;
  }
  getDocumentNodeVariable(node, documentVariableName) {
    return this.config.documentMode ===
      visitorPluginCommon.DocumentMode.external
      ? `Operations.${node.name.value}`
      : documentVariableName;
  }
  getImports() {
    const baseImports = super.getImports();
    const hasOperations = this._collectedOperations.length > 0;
    if (!hasOperations) {
      return baseImports;
    }
    return [...baseImports, ...Array.from(this.imports)];
  }
  _buildHocProps(operationName, operationType) {
    const typeVariableName =
      this._externalImportPrefix +
      this.convertName(
        operationName +
          pascalCase.pascalCase(operationType) +
          this._parsedConfig.operationResultSuffix,
      );
    const variablesVarName =
      this._externalImportPrefix +
      this.convertName(
        operationName + pascalCase.pascalCase(operationType) + "Variables",
      );
    const typeArgs = `<${typeVariableName}, ${variablesVarName}>`;
    if (operationType === "mutation") {
      this.imports.add(this.getApolloReactCommonImport());
      return `ApolloReactCommon.MutationFunction${typeArgs}`;
    } else {
      this.imports.add(this.getApolloReactHocImport());
      return `ApolloReactHoc.DataValue${typeArgs}`;
    }
  }
  _buildMutationFn(node, operationResultType, operationVariablesTypes) {
    if (node.operation === "mutation") {
      this.imports.add(this.getApolloReactCommonImport());
      return `export type ${this.convertName(
        node.name.value + "MutationFn",
      )} = ApolloReactCommon.MutationFunction<${operationResultType}, ${operationVariablesTypes}>;`;
    }
    return null;
  }
  _buildOperationHoc(
    node,
    documentVariableName,
    operationResultType,
    operationVariablesTypes,
  ) {
    this.imports.add(this.getApolloReactCommonImport());
    this.imports.add(this.getApolloReactHocImport());
    const operationName = this.convertName(node.name.value, {
      useTypesPrefix: false,
    });
    const propsTypeName = this.convertName(node.name.value, {suffix: "Props"});
    const defaultDataName = node.operation === "mutation" ? "mutate" : "data";
    const propsVar = `export type ${propsTypeName}<TChildProps = {}, TDataName extends string = '${defaultDataName}'> = {
      [key in TDataName]: ${this._buildHocProps(
        node.name.value,
        node.operation,
      )}
    } & TChildProps;`;
    const hocString = `export function with${operationName}<TProps, TChildProps = {}, TDataName extends string = '${defaultDataName}'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ${operationResultType},
  ${operationVariablesTypes},
  ${propsTypeName}<TChildProps, TDataName>>) {
    return ApolloReactHoc.with${pascalCase.pascalCase(
      node.operation,
    )}<TProps, ${operationResultType}, ${operationVariablesTypes}, ${propsTypeName}<TChildProps, TDataName>>(${this.getDocumentNodeVariable(
      node,
      documentVariableName,
    )}, {
      alias: '${camelCase.camelCase(operationName)}',
      ...operationOptions
    });
};`;
    return [propsVar, hocString].filter(a => a).join("\n");
  }
  _buildComponent(
    node,
    documentVariableName,
    operationType,
    operationResultType,
    operationVariablesTypes,
  ) {
    const componentPropsName = this.convertName(node.name.value, {
      suffix: this.config.componentSuffix + "Props",
      useTypesPrefix: false,
    });
    const componentName = this.convertName(node.name.value, {
      suffix: this.config.componentSuffix,
      useTypesPrefix: false,
    });
    const isVariablesRequired =
      operationType === "Query" &&
      node.variableDefinitions.some(
        variableDef => variableDef.type.kind === graphql.Kind.NON_NULL_TYPE,
      );
    this.imports.add(this.getReactImport());
    this.imports.add(this.getApolloReactCommonImport());
    this.imports.add(this.getApolloReactComponentsImport());
    this.imports.add(this.getOmitDeclaration());
    const propsType = `Omit<ApolloReactComponents.${operationType}ComponentOptions<${operationResultType}, ${operationVariablesTypes}>, '${operationType.toLowerCase()}'>`;
    let componentProps = "";
    if (isVariablesRequired) {
      componentProps = `export type ${componentPropsName} = ${propsType} & ({ variables: ${operationVariablesTypes}; skip?: boolean; } | { skip: boolean; });`;
    } else {
      componentProps = `export type ${componentPropsName} = ${propsType};`;
    }
    const component = `
    export const ${componentName} = (props: ${componentPropsName}) => (
      <ApolloReactComponents.${operationType}<${operationResultType}, ${operationVariablesTypes}> ${
      node.operation
    }={${this.getDocumentNodeVariable(
      node,
      documentVariableName,
    )}} {...props} />
    );
    `;
    return [componentProps, component].join("\n");
  }
  _buildHooksJSDoc(node, operationName, operationType) {
    const variableString = node.variableDefinitions.reduce((acc, item) => {
      const name = item.variable.name.value;
      return `${acc}\n *      ${name}: // value for '${name}'`;
    }, "");
    const queryDescription = `
 * To run a query within a React component, call \`use${operationName}\` and pass it any options that fit your needs.
 * When your component renders, \`use${operationName}\` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.`;
    const queryExample = `
 * const { data, loading, error } = use${operationName}({
 *   variables: {${variableString}
 *   },
 * });`;
    const mutationDescription = `
 * To run a mutation, you first call \`use${operationName}\` within a React component and pass it any options that fit your needs.
 * When your component renders, \`use${operationName}\` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution`;
    const mutationExample = `
 * const [${camelCase.camelCase(
   operationName,
 )}, { data, loading, error }] = use${operationName}({
 *   variables: {${variableString}
 *   },
 * });`;
    return `
/**
 * __use${operationName}__
 *${operationType === "Mutation" ? mutationDescription : queryDescription}
 *
 * @param baseOptions options that will be passed into the ${operationType.toLowerCase()}, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#${
      operationType === "Mutation" ? "options-2" : "options"
    };
 *
 * @example${operationType === "Mutation" ? mutationExample : queryExample}
 */`;
  }
  _buildHooks(
    node,
    operationType,
    documentVariableName,
    operationResultType,
    operationVariablesTypes,
  ) {
    const suffix = this._getHookSuffix(node.name.value, operationType);
    const operationName = this.convertName(node.name.value, {
      suffix,
      useTypesPrefix: false,
    });
    this.imports.add(this.getApolloReactCommonImport());
    this.imports.add(this.getApolloReactHooksImport());
    const hookFns = [
      `export function use${operationName}(baseOptions?: ApolloReactHooks.${operationType}HookOptions<${operationResultType}, ${operationVariablesTypes}>) {
        return ApolloReactHooks.use${operationType}<${operationResultType}, ${operationVariablesTypes}>(${this.getDocumentNodeVariable(
        node,
        documentVariableName,
      )}, baseOptions);
      }`,
    ];
    if (this.config.addDocBlocks) {
      hookFns.unshift(
        this._buildHooksJSDoc(node, operationName, operationType),
      );
    }
    const hookResults = [
      `export type ${operationName}HookResult = ReturnType<typeof use${operationName}>;`,
    ];
    // if (operationType === "Query") {
    //   const lazyOperationName = this.convertName(node.name.value, {
    //     suffix: pascalCase.pascalCase("LazyQuery"),
    //     useTypesPrefix: false,
    //   });
    //   hookFns.push(`export function use${lazyOperationName}(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<${operationResultType}, ${operationVariablesTypes}>) {
    //       return ApolloReactHooks.useLazyQuery<${operationResultType}, ${operationVariablesTypes}>(${this.getDocumentNodeVariable(
    //     node,
    //     documentVariableName,
    //   )}, baseOptions);
    //     }`);
    //   hookResults.push(
    //     `export type ${lazyOperationName}HookResult = ReturnType<typeof use${lazyOperationName}>;`,
    //   );
    // }
    return [...hookFns, ...hookResults].join("\n");
  }
  _getHookSuffix(name, operationType) {
    if (this.config.omitOperationSuffix) {
      return "";
    }
    if (!this.config.dedupeOperationSuffix) {
      return pascalCase.pascalCase(operationType);
    }
    if (
      name.includes("Query") ||
      name.includes("Mutation") ||
      name.includes("Subscription")
    ) {
      return "";
    }
    return pascalCase.pascalCase(operationType);
  }
  _buildResultType(
    node,
    operationType,
    operationResultType,
    operationVariablesTypes,
  ) {
    const componentResultType = this.convertName(node.name.value, {
      suffix: `${operationType}Result`,
      useTypesPrefix: false,
    });
    switch (node.operation) {
      case "query":
        this.imports.add(this.getApolloReactCommonImport());
        return `export type ${componentResultType} = ApolloReactCommon.QueryResult<${operationResultType}, ${operationVariablesTypes}>;`;
      case "mutation":
        this.imports.add(this.getApolloReactCommonImport());
        return `export type ${componentResultType} = ApolloReactCommon.MutationResult<${operationResultType}>;`;
      case "subscription":
        this.imports.add(this.getApolloReactCommonImport());
        return `export type ${componentResultType} = ApolloReactCommon.SubscriptionResult<${operationResultType}>;`;
      default:
        return "";
    }
  }
  _buildWithMutationOptionsType(
    node,
    operationResultType,
    operationVariablesTypes,
  ) {
    if (node.operation !== "mutation") {
      return "";
    }
    this.imports.add(this.getApolloReactCommonImport());
    const mutationOptionsType = this.convertName(node.name.value, {
      suffix: "MutationOptions",
      useTypesPrefix: false,
    });
    return `export type ${mutationOptionsType} = ApolloReactCommon.BaseMutationOptions<${operationResultType}, ${operationVariablesTypes}>;`;
  }
  _buildRefetchFn(
    node,
    documentVariableName,
    operationType,
    operationVariablesTypes,
  ) {
    if (node.operation !== "query") {
      return "";
    }
    const operationName = this.convertName(node.name.value, {
      suffix: this._getHookSuffix(node.name.value, operationType),
      useTypesPrefix: false,
    });
    return `export function refetch${operationName}(variables?: ${operationVariablesTypes}) {
      return { query: ${this.getDocumentNodeVariable(
        node,
        documentVariableName,
      )}, variables: variables }
    }`;
  }
  buildOperation(
    node,
    documentVariableName,
    operationType,
    operationResultType,
    operationVariablesTypes,
  ) {
    operationResultType = this._externalImportPrefix + operationResultType;
    operationVariablesTypes =
      this._externalImportPrefix + operationVariablesTypes;
    const mutationFn =
      this.config.withMutationFn || this.config.withComponent
        ? this._buildMutationFn(
            node,
            operationResultType,
            operationVariablesTypes,
          )
        : null;
    const component = this.config.withComponent
      ? this._buildComponent(
          node,
          documentVariableName,
          operationType,
          operationResultType,
          operationVariablesTypes,
        )
      : null;
    const hoc = this.config.withHOC
      ? this._buildOperationHoc(
          node,
          documentVariableName,
          operationResultType,
          operationVariablesTypes,
        )
      : null;
    const hooks = this.config.withHooks
      ? this._buildHooks(
          node,
          operationType,
          documentVariableName,
          operationResultType,
          operationVariablesTypes,
        )
      : null;
    const resultType = this.config.withResultType
      ? this._buildResultType(
          node,
          operationType,
          operationResultType,
          operationVariablesTypes,
        )
      : null;
    const mutationOptionsType = this.config.withMutationOptionsType
      ? this._buildWithMutationOptionsType(
          node,
          operationResultType,
          operationVariablesTypes,
        )
      : null;
    const refetchFn = this.config.withRefetchFn
      ? this._buildRefetchFn(
          node,
          documentVariableName,
          operationType,
          operationVariablesTypes,
        )
      : null;
    return [
      mutationFn,
      component,
      hoc,
      hooks,
      resultType,
      mutationOptionsType,
      refetchFn,
    ]
      .filter(a => a)
      .join("\n");
  }
}

const plugin = (schema, documents, config) => {
  const allAst = graphql.concatAST(documents.map(v => v.document));
  const allFragments = [
    ...allAst.definitions
      .filter(d => d.kind === graphql.Kind.FRAGMENT_DEFINITION)
      .map(fragmentDef => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })),
    ...(config.externalFragments || []),
  ];
  const visitor = new ReactApolloVisitor(
    schema,
    allFragments,
    config,
    documents,
  );
  const visitorResult = graphql.visit(allAst, {leave: visitor});
  return {
    prepend: visitor.getImports(),
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter(t => typeof t === "string"),
    ].join("\n"),
  };
};
const validate = async (schema, documents, config, outputFile) => {
  if (config.withComponent === false) {
    if (
      path.extname(outputFile) !== ".ts" &&
      path.extname(outputFile) !== ".tsx"
    ) {
      throw new Error(
        `Plugin "react-apollo" with "noComponents" requires extension to be ".ts" or ".tsx"!`,
      );
    }
  } else {
    if (path.extname(outputFile) !== ".tsx") {
      throw new Error(`Plugin "react-apollo" requires extension to be ".tsx"!`);
    }
  }
};

exports.ReactApolloVisitor = ReactApolloVisitor;
exports.plugin = plugin;
exports.validate = validate;
//# sourceMappingURL=index.cjs.js.map
