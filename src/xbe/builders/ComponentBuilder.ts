// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentMap = Map<string, any>;

/**
 * Class representing a builder for components.
 */
class ComponentBuilder {
  /**
   * A map of components.
   */
  private components: ComponentMap;

  /**
   * Creates an instance of ComponentBuilder.
   * @param {Object} param0 - The parameters object.
   * @param {ComponentMap} param0.components - The map of components.
   */
  constructor({ components }: { components: ComponentMap }) {
    this.components = components;
  }

  /**
   * Returns a factory function that retrieves a component by its module name.
   * @returns {(moduleName: string) => Component | undefined} A function that takes a module name and returns the corresponding component.
   */
  getModuleFactory() {
    return (moduleName: string) => {
      const component = this.components.get(moduleName);
      if (!component) {        
        console.log(`Component not found for module: ${moduleName}`);
      }
      return component;
    };
  }
}

export default ComponentBuilder;
