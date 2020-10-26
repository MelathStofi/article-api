export const mockRequest = () => {
      const req = {
          body: () => {},
          params: () => {},
          article_token: () => {},
          query: {
            pageSize: () => {},
            page: () => {}
          }
      };
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      req.query.pageSize = jest.fn().mockReturnValue(req);
      req.query.page = jest.fn().mockReturnValue(req);
      return req;
    }
  
export const mockResponse = () => {
    const res = {
        send: () => {},
        status: () => {},
        json: () => {}
    };
      res.send = jest.fn().mockReturnValue(res)
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)
      return res
    }

export const mockNext = jest.fn();