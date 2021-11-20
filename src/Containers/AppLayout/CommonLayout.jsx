import React, { memo } from "react";


export const CommonLayout = ({ children }) => (
    <div className="commonLayout">
       
            {children}
       
    </div>
);

export default memo(CommonLayout);
