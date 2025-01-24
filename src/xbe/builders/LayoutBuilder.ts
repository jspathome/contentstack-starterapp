// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LayoutMap = Map<string, any>;

/**
 * Class representing a LayoutBuilder.
 */
class LayoutBuilder {
  /**
   * A map of layouts.
   * @private
   */
  private Layouts: LayoutMap;

  /**
   * Creates an instance of LayoutBuilder.
   * @param {Object} params - The parameters for the LayoutBuilder.
   * @param {LayoutMap} params.Layouts - A map of layouts.
   */
  constructor({ Layouts }: { Layouts: LayoutMap }) {
    this.Layouts = Layouts;
  }

  /**
   * Returns a factory function that retrieves a layout by its UID.
   * @returns {(LayoutUid: string) => Layout | undefined} A function that takes a layout UID and returns the corresponding layout.
   */
  getLayoutFactory() {
    return (LayoutUid: string) => {
      const layout = this.Layouts.get(LayoutUid);
      if (!layout) {        
        console.log('Component not found for module: ${moduleName}');
      }
      return layout;
    };
  }
}

export default LayoutBuilder;
